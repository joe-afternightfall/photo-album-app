import firebase from 'firebase/compat/app';
import { Dispatch } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { v4 as uuidv4 } from 'uuid';

import { FIREBASE_IMAGES_ROUTE } from '../../configs/firebase/firebase-routes';
import { ImageDAO, ImageVO } from '../../configs/interfaces';
import { ACCESS_TYPE } from '../../configs/interfaces/image/ImageDAO';
import { State } from '../../configs/redux/store';
import { ApplicationActions } from '../../creators/actions';
import { displayAppLoader, hideAppLoader } from '../../creators/app-loader';
import {
  displayErrorSnackbar,
  displaySuccessSnackbar,
} from '../../creators/app-snackbar';
import { mapImageSnapToVO } from '../../utils/mapper';
import { generateTimestamp } from '../../utils/timestamp-generator';
import { updateAlbumImageIds } from './firebase-albums-service';

import 'firebase/compat/database';
import 'firebase/compat/storage';

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
    });
};

export const uploadImageFiles =
  (
    albumId: string,
    files: File[],
    callback?: () => void
  ): ThunkAction<void, State, void, ApplicationActions> =>
  async (dispatch: Dispatch, getState: () => State): Promise<void> => {
    dispatch(displayAppLoader());
    const errors: string[] = [];
    const totalFiles = files.length;
    const firebaseImageIdsToAdd: string[] = [];

    await Promise.all(
      files.map(async (file) => {
        // const storageRef = firebase.storage().ref(`images/${uuidv4()}/${index}`);
        const imageId = uuidv4();
        const storageRef = firebase.storage().ref(`images/${imageId}`);

        await storageRef.put(file);
        // await storageRef.put(file).on('state_change', (snapshot) => {
        //   console.log(snapshot.bytesTransferred);
        // });

        const downloadURL = await storageRef.getDownloadURL();
        const timestamp = generateTimestamp();

        const imageInfo: ImageDAO = {
          id: imageId,
          nickname: '',
          fileName: file.name,
          downloadURL: downloadURL,
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
      updateAlbumImageIds(firebaseImageIdsToAdd)
    );

    callback && callback();
    dispatch(hideAppLoader());
    if (errors.length === 0) {
      dispatch(
        displaySuccessSnackbar(
          `Successfully saved ${totalFiles > 1 ? 'images.' : 'image.'}`
        )
      );
    } else if (errors.length === 1) {
      dispatch(displayErrorSnackbar(`Error saving ${errors[0]}`));
    } else if (errors.length > 1) {
      dispatch(displayErrorSnackbar('Error saving images.'));
    }
  };

export const deleteImage =
  (
    imageFirebaseId: string,
    imageId: string
  ): ThunkAction<void, State, void, ApplicationActions> =>
  async (dispatch: Dispatch): Promise<void> => {
    dispatch(displayAppLoader());
    return await firebase
      .database()
      .ref(FIREBASE_IMAGES_ROUTE)
      .child(imageFirebaseId)
      .remove(async (error: Error | null) => {
        if (error) {
          dispatch(displayErrorSnackbar('Error deleting image'));
        } else {
          return await firebase
            .storage()
            .ref(`images`)
            .child(imageId)
            .delete()
            .then(() => {
              dispatch(displaySuccessSnackbar('Deleted image.'));
              dispatch(hideAppLoader());
            })
            .catch((e) => {
              console.error('delete image error: ' + JSON.stringify(e));
              dispatch(displayErrorSnackbar('Error deleting image.'));
              dispatch(hideAppLoader());
            });
        }
      });
  };

export const toggleImageAccessType =
  (
    imageFirebaseId: string,
    accessType: ACCESS_TYPE
  ): ThunkAction<void, State, void, ApplicationActions> =>
  async (dispatch: Dispatch): Promise<void> => {
    return await firebase
      .database()
      .ref(FIREBASE_IMAGES_ROUTE)
      .child(imageFirebaseId)
      .update(
        {
          accessType,
        },
        (error: Error | null) => {
          if (error) {
            dispatch(displayErrorSnackbar('Failed to update access type'));
          } else {
            dispatch(displaySuccessSnackbar('Updated access type'));
          }
        }
      );
  };
