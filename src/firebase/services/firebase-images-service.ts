import firebase from 'firebase/compat/app';
import { Dispatch } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';

import { FIREBASE_IMAGES_ROUTE } from '../../configs/firebase/firebase-routes';
import { ImageVO } from '../../configs/interfaces';
import { ACCESS_TYPE } from '../../configs/interfaces/image/ImageDAO';
import { State } from '../../configs/redux/store';
import { ApplicationActions } from '../../creators/actions';
import { loadAlbums } from '../../creators/albums';
import { displayAppLoader, hideAppLoader } from '../../creators/app-loader';
import {
  displayErrorSnackbar,
  displaySuccessSnackbar,
} from '../../creators/app-snackbar';
import { DeleteImageInfo } from '../../creators/dialogs/delete-image';
import { loadImages } from '../../creators/images';
import { mapImageSnapToVO } from '../../utils/mapper';
import {
  getAllAlbums,
  removeImageIdFromAlbum,
} from './firebase-albums-service';
import { deleteImageFromStorage } from './firebase-storage-service';

import 'firebase/compat/database';
import 'firebase/compat/storage';

const reloadAndClearLoader = async (dispatch: Dispatch) => {
  const albums = await getAllAlbums();
  const images = await getAllImages();
  dispatch(loadAlbums(albums));
  dispatch(loadImages(images));

  setTimeout(() => {
    dispatch(hideAppLoader());
  }, 1500);
};

export const getAllImages = async (): Promise<ImageVO[]> => {
  return await firebase
    .database()
    .ref(FIREBASE_IMAGES_ROUTE)
    .once('value')
    .then((snapshot) => {
      const snap = snapshot.val();
      if (snap) {
        return mapImageSnapToVO(snap);
      } else {
        return [];
      }
    })
    .catch((e) => {
      console.error(
        '******* error fetching image records: ' + JSON.stringify(e)
      );
      return Promise.reject(JSON.stringify(e));
    });
};

export const permanentlyDeleteImages =
  (
    images: DeleteImageInfo[]
  ): ThunkAction<void, State, void, ApplicationActions> =>
  async (dispatch: Dispatch): Promise<void> => {
    dispatch(displayAppLoader());
    await Promise.all(
      images.map(async (imageToDelete) => {
        return await firebase
          .database()
          .ref(FIREBASE_IMAGES_ROUTE)
          .child(imageToDelete.imageFirebaseId)
          .remove(async (error: Error | null) => {
            if (error) {
              dispatch(displayErrorSnackbar('Error deleting image'));
            } else {
              (dispatch as ThunkDispatch<State, void, ApplicationActions>)(
                deleteImageFromStorage(imageToDelete.imageId)
              );
              (dispatch as ThunkDispatch<State, void, ApplicationActions>)(
                removeImageIdFromAlbum()
              );
            }
          });
      })
    );
    await reloadAndClearLoader(dispatch);
  };

export type ToggleImageInfo = {
  imageFirebaseId: string;
  accessType: ACCESS_TYPE;
};

export const toggleImagesAccessTypes =
  (
    images: ToggleImageInfo[]
  ): ThunkAction<void, State, void, ApplicationActions> =>
  async (dispatch: Dispatch): Promise<void> => {
    dispatch(displayAppLoader());
    await Promise.all(
      images.map(async (image) => {
        return await firebase
          .database()
          .ref(FIREBASE_IMAGES_ROUTE)
          .child(image.imageFirebaseId)
          .update({
            accessType: image.accessType,
          });
      })
    );
    await reloadAndClearLoader(dispatch);
    dispatch(displaySuccessSnackbar('Updated image access types'));
  };

export const toggleImageAccessType =
  (
    imageFirebaseId: string,
    accessType: ACCESS_TYPE
  ): ThunkAction<void, State, void, ApplicationActions> =>
  async (dispatch: Dispatch): Promise<void> => {
    dispatch(displayAppLoader());
    return await firebase
      .database()
      .ref(FIREBASE_IMAGES_ROUTE)
      .child(imageFirebaseId)
      .update(
        {
          accessType,
        },
        async (error: Error | null) => {
          if (error) {
            dispatch(hideAppLoader());
            dispatch(displayErrorSnackbar('Failed to update access type'));
          } else {
            await reloadAndClearLoader(dispatch);
            dispatch(displaySuccessSnackbar('Updated access type'));
          }
        }
      );
  };
