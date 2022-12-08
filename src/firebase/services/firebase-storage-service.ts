import firebase from 'firebase/compat/app';
import { Dispatch } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { v4 as uuidv4 } from 'uuid';

import {
  FIREBASE_IMAGES_ROUTE,
  FIREBASE_STORAGE_COMPRESSED_IMAGE_ROUTE,
  FIREBASE_STORAGE_ORIGINAL_IMAGE_ROUTE,
} from '../../configs/firebase/firebase-routes';
import { ImageDAO } from '../../configs/interfaces';
import { ACCESS_TYPE } from '../../configs/interfaces/image/ImageDAO';
import { State } from '../../configs/redux/store';
import { ApplicationActions } from '../../creators/actions';
import { loadAlbums } from '../../creators/albums';
import { displayAppLoader, hideAppLoader } from '../../creators/app-loader';
import {
  displayErrorSnackbar,
  displaySuccessSnackbar,
} from '../../creators/app-snackbar';
import { loadImages } from '../../creators/images';
import { generateTimestamp } from '../../utils/timestamp-generator';
import { addImageIdsToAlbum, getAllAlbums } from './firebase-albums-service';
import { getAllImages } from './firebase-images-service';

const reloadAndClearLoader = async (dispatch: Dispatch) => {
  const albums = await getAllAlbums();
  const images = await getAllImages();
  dispatch(loadAlbums(albums));
  dispatch(loadImages(images));

  setTimeout(() => {
    dispatch(hideAppLoader());
  }, 1500);
};

export const uploadImages =
  (
    albumId: string,
    files: {
      originalImage: File;
      compressedImage: File | Blob;
    }[],
    callback?: () => void
  ): ThunkAction<void, State, void, ApplicationActions> =>
  async (dispatch: Dispatch): Promise<void> => {
    dispatch(displayAppLoader());
    const errors: string[] = [];
    const totalFiles = files.length;
    const firebaseImageIdsToAdd: string[] = [];

    await Promise.all(
      files.map(async ({ originalImage, compressedImage }) => {
        const imageId = uuidv4();
        const ORIGINAL_ROUTE = `${FIREBASE_STORAGE_ORIGINAL_IMAGE_ROUTE}/${imageId}`;
        const COMPRESSED_ROUTE = `${FIREBASE_STORAGE_COMPRESSED_IMAGE_ROUTE}/${imageId}`;

        const originalStorageRef = firebase.storage().ref(ORIGINAL_ROUTE);
        await originalStorageRef.put(originalImage);
        const originalDownloadURL = await originalStorageRef.getDownloadURL();

        const compressedStorageRef = firebase.storage().ref(COMPRESSED_ROUTE);
        await compressedStorageRef.put(compressedImage);
        const compressedDownloadURL =
          await compressedStorageRef.getDownloadURL();
        const timestamp = generateTimestamp();

        const imageInfo: ImageDAO = {
          id: imageId,
          nickname: '',
          fileName: originalImage.name,
          originalDownloadURL,
          compressedDownloadURL,
          accessType: ACCESS_TYPE.UNDEFINED,
          created: timestamp,
          updated: timestamp,
        };

        const ref = firebase.database().ref(FIREBASE_IMAGES_ROUTE);
        const newRef = ref.push();
        const firebaseKey = newRef.key;
        return await newRef.set(imageInfo, (e: Error | null) => {
          firebaseKey && firebaseImageIdsToAdd.push(firebaseKey);
          if (e) {
            console.error('e: ' + JSON.stringify(e));
            errors.push(imageInfo.fileName);
          }
        });
      })
    );

    (dispatch as ThunkDispatch<State, void, ApplicationActions>)(
      addImageIdsToAlbum(firebaseImageIdsToAdd)
    );

    callback && callback();
    if (errors.length === 0) {
      await reloadAndClearLoader(dispatch);
      dispatch(
        displaySuccessSnackbar(
          `Successfully saved ${totalFiles > 1 ? 'images.' : 'image.'}`
        )
      );
    } else if (errors.length === 1) {
      dispatch(hideAppLoader());
      dispatch(displayErrorSnackbar(`Error saving ${errors[0]}`));
    } else if (errors.length > 1) {
      dispatch(hideAppLoader());
      dispatch(displayErrorSnackbar('Error saving images.'));
    }
  };

export const deleteImageFromStorage =
  (imageId: string): ThunkAction<void, State, void, ApplicationActions> =>
  async (dispatch: Dispatch): Promise<void> => {
    deleteOriginalImage(imageId)
      .then(() => {
        deleteCompressedImage(imageId)
          .then(async () => {
            await reloadAndClearLoader(dispatch);
            dispatch(displaySuccessSnackbar('Deleted image.'));
          })
          .catch(() => {
            dispatch(displayErrorSnackbar('Error deleting image.'));
            dispatch(hideAppLoader());
          });
      })
      .catch(() => {
        dispatch(displayErrorSnackbar('Error deleting image.'));
        dispatch(hideAppLoader());
      });
  };

const deleteCompressedImage = async (imageId: string): Promise<void> => {
  return await firebase
    .storage()
    .ref(FIREBASE_STORAGE_COMPRESSED_IMAGE_ROUTE)
    .child(imageId)
    .delete()
    .then(() => {
      return Promise.resolve();
    })
    .catch((e) => {
      console.error('error deleting compressed image: ' + JSON.stringify(e));
      return Promise.reject();
    });
};

const deleteOriginalImage = async (imageId: string): Promise<void> => {
  return await firebase
    .storage()
    .ref(FIREBASE_STORAGE_ORIGINAL_IMAGE_ROUTE)
    .child(imageId)
    .delete()
    .then(() => {
      return Promise.resolve();
    })
    .catch((e) => {
      console.error('error deleting original image: ' + JSON.stringify(e));
      return Promise.reject();
    });
};
