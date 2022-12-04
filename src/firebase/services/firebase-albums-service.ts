import firebase from 'firebase/compat/app';
import isEmpty from 'is-empty';
import * as ramda from 'ramda';
import { Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { v4 as uuidv4 } from 'uuid';
import 'firebase/compat/database';

import { FIREBASE_ALBUMS_ROUTE } from '../../configs/firebase/firebase-routes';
import { AlbumDAO, AlbumVO, ImageVO } from '../../configs/interfaces';
import { State } from '../../configs/redux/store';
import { ApplicationActions } from '../../creators/actions';
import { displayAppLoader, hideAppLoader } from '../../creators/app-loader';
import {
  displayErrorSnackbar,
  displaySuccessSnackbar,
} from '../../creators/app-snackbar';
import { DeleteImageInfo } from '../../creators/dialogs/delete-image';
import { generateTimestamp } from '../../utils/timestamp-generator';
import { getAllImages } from './firebase-images-service';

export const getAllAlbums = async (): Promise<AlbumVO[]> => {
  return await firebase
    .database()
    .ref(FIREBASE_ALBUMS_ROUTE)
    .once('value')
    .then(async (snapshot) => {
      const snap = snapshot.val();
      if (snap) {
        const allImages = await getAllImages();
        return Object.keys(snap).map((key: string): AlbumVO => {
          const imageIds = snap[key].imageIds as unknown as string[];
          const albumImages: ImageVO[] = [];
          imageIds &&
            imageIds.map((id) => {
              allImages.map((image) => {
                if (image.firebaseId === id) {
                  albumImages.push(image);
                }
              });
            });

          return {
            firebaseId: key,
            id: snap[key].id,
            title: snap[key].title,
            subtitle: snap[key].subtitle,
            coverImageDownloadURL: snap[key].coverImageDownloadURL,
            images: albumImages,
            isPrivateAlbum: snap[key].isPrivateAlbum,
            imagesShouldBeOrdered: snap[key].imagesShouldBeOrdered,
            created: snap[key].created,
            updated: snap[key].updated,
          };
        });
      } else {
        return [];
      }
    });
};

export interface NewAlbumInfo {
  title: string;
  subtitle: string;
  isPrivateAlbum: boolean;
  imagesShouldBeOrdered: boolean;
}

export const saveNewAlbum =
  (
    info: NewAlbumInfo,
    successCallback?: () => void
  ): ThunkAction<void, State, void, ApplicationActions> =>
  async (dispatch: Dispatch): Promise<void> => {
    dispatch(displayAppLoader());

    const ref = firebase.database().ref(FIREBASE_ALBUMS_ROUTE);
    const newRef = ref.push();

    const timestamp = generateTimestamp();

    const newAlbum: AlbumDAO = {
      id: uuidv4(),
      title: info.title,
      subtitle: info.subtitle,
      coverImageDownloadURL: '',
      imageIds: [],
      isPrivateAlbum: info.isPrivateAlbum,
      imagesShouldBeOrdered: info.imagesShouldBeOrdered,
      created: timestamp,
      updated: timestamp,
    };

    return await newRef.set(newAlbum, (error: Error | null) => {
      if (error) {
        dispatch(displayErrorSnackbar(`Error creating album ${info.title}.`));
      } else {
        dispatch(
          displaySuccessSnackbar(`Successfully created album ${info.title}.`)
        );
        successCallback && successCallback();
        setTimeout(() => {
          dispatch(hideAppLoader());
        }, 1500);
      }
    });
  };

export interface UpdateAlbumInfo {
  firebaseId: string;
  title: string;
  subtitle: string;
  isPrivateAlbum: boolean;
  imagesShouldBeOrdered: boolean;
}

export const updateAlbumInfo =
  (
    updateInfo: UpdateAlbumInfo,
    successCallback?: () => void
  ): ThunkAction<void, State, void, ApplicationActions> =>
  async (dispatch: Dispatch): Promise<void> => {
    dispatch(displayAppLoader());
    return await firebase
      .database()
      .ref(FIREBASE_ALBUMS_ROUTE)
      .child(updateInfo.firebaseId)
      .update(
        {
          title: updateInfo.title,
          subtitle: updateInfo.subtitle,
          isPrivateAlbum: updateInfo.isPrivateAlbum,
          imagesShouldBeOrdered: updateInfo.imagesShouldBeOrdered,
          updated: generateTimestamp(),
        },
        (error: Error | null) => {
          if (error) {
            dispatch(displayErrorSnackbar('Error updating album info'));
          } else {
            dispatch(displaySuccessSnackbar('Updated album info'));
            successCallback && successCallback();
            setTimeout(() => {
              dispatch(hideAppLoader());
            }, 1000);
          }
        }
      );
  };

export const updateAlbumCoverImage =
  (
    firebaseId: string,
    coverImageDownloadURL: string
  ): ThunkAction<void, State, void, ApplicationActions> =>
  async (dispatch: Dispatch): Promise<void> => {
    return await firebase
      .database()
      .ref(FIREBASE_ALBUMS_ROUTE)
      .child(firebaseId)
      .update(
        {
          coverImageDownloadURL,
          updated: generateTimestamp(),
        },
        (error: Error | null) => {
          if (error) {
            dispatch(displayErrorSnackbar('Failed to update album cover'));
          } else {
            dispatch(
              displaySuccessSnackbar('Successfully updated album cover')
            );
          }
        }
      );
  };

export const addImageIdsToAlbum =
  (imageIds: string[]): ThunkAction<void, State, void, ApplicationActions> =>
  async (dispatch: Dispatch, getState: () => State): Promise<void> => {
    const currentAlbum = getState().selectedAlbumState.currentAlbum;

    if (currentAlbum) {
      const firebaseId = currentAlbum.firebaseId;
      const currentAlbumImageIds: string[] = [];

      if (currentAlbum.images.length) {
        currentAlbum.images.map((image) => {
          currentAlbumImageIds.push(image.firebaseId);
        });
      }

      imageIds.map((id) => {
        currentAlbumImageIds.push(id);
      });

      return await firebase
        .database()
        .ref(FIREBASE_ALBUMS_ROUTE)
        .child(firebaseId)
        .update({
          imageIds: currentAlbumImageIds,
          updated: generateTimestamp(),
        });
    }
  };

export const removeImageIdFromAlbum =
  (): ThunkAction<void, State, void, ApplicationActions> =>
  async (dispatch: Dispatch, getState: () => State): Promise<void> => {
    const currentAlbum = getState().selectedAlbumState.currentAlbum;

    if (currentAlbum) {
      if (currentAlbum.images.length) {
        const firebaseId = currentAlbum.firebaseId;
        return await firebase
          .database()
          .ref(FIREBASE_ALBUMS_ROUTE)
          .child(firebaseId)
          .update({
            imageIds: currentAlbum.images.map((image) => image.firebaseId),
            updated: generateTimestamp(),
          });
      }
    }
  };

export const removeImagesFromAlbum =
  (
    images: DeleteImageInfo[]
  ): ThunkAction<void, State, void, ApplicationActions> =>
  async (dispatch: Dispatch, getState: () => State): Promise<void> => {
    const currentAlbum = getState().selectedAlbumState.currentAlbum;

    if (currentAlbum) {
      const firebaseId = currentAlbum.firebaseId;
      const clonedImages = ramda.clone(currentAlbum.images);
      const filteredImages = clonedImages.filter((clonedImage) => {
        const foundImage = images.find(
          (imageToDelete) =>
            imageToDelete.imageFirebaseId === clonedImage.firebaseId
        );
        if (isEmpty(foundImage)) {
          return clonedImage;
        }
      });

      return await firebase
        .database()
        .ref(FIREBASE_ALBUMS_ROUTE)
        .child(firebaseId)
        .update({
          imageIds: filteredImages.map((image) => image.firebaseId),
          updated: generateTimestamp(),
        });
    }
  };

export const deleteAlbum =
  (
    firebaseId: string,
    callback?: () => void
  ): ThunkAction<void, State, void, ApplicationActions> =>
  async (dispatch: Dispatch): Promise<void> => {
    return await firebase
      .database()
      .ref(FIREBASE_ALBUMS_ROUTE)
      .child(firebaseId)
      .remove((error: Error | null) => {
        if (error) {
          dispatch(displayErrorSnackbar('Error while deleting album'));
        } else {
          dispatch(displaySuccessSnackbar('Successfully deleted album'));
          callback && callback();
        }
      });
  };
