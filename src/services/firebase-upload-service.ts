import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';
import { Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { v4 as uuidv4 } from 'uuid';

import { FIREBASE_IMAGES_ROUTE } from '../configs/firebase/firebase-routes';
import { ImageDAO } from '../configs/interfaces';
import { ACCESS_TYPE } from '../configs/interfaces/image/ImageDAO';
import { State } from '../configs/redux/store';
import { ApplicationActions } from '../creators/actions';
import {
  displayErrorSnackbar,
  displaySuccessSnackbar,
} from '../creators/app-snackbar';
import { generateTimestamp } from '../utils/timestamp-generator';

export const uploadImageFiles =
  (
    albumId: string,
    files: File[],
    callback?: () => void
  ): ThunkAction<void, State, void, ApplicationActions> =>
  async (): Promise<void> => {
    files.map(async (file) => {
      // const storageRef = firebase.storage().ref(`images/${uuidv4()}/${index}`);
      const imageId = uuidv4();
      const storageRef = firebase.storage().ref(`images/${imageId}`);

      await storageRef.put(file);

      const downloadURL = await storageRef.getDownloadURL();
      const timestamp = generateTimestamp();

      const imageInfo: ImageDAO = {
        id: imageId,
        nickname: '',
        fileName: file.name,
        tagIds: [],
        downloadURL: downloadURL,
        albumId: albumId,
        accessType: ACCESS_TYPE.NOT_DEFINED,
        created: timestamp,
        updated: timestamp,
      };

      const ref = firebase.database().ref(FIREBASE_IMAGES_ROUTE);
      const newRef = ref.push();

      return await newRef.set(imageInfo, (e: Error | null) => {
        if (e) {
          console.error('e: ' + JSON.stringify(e));
        } else {
          console.log('success');
        }
      });
    });

    callback && callback();
  };

export const deleteImage =
  (
    imageFirebaseId: string,
    imageId: string
  ): ThunkAction<void, State, void, ApplicationActions> =>
  async (dispatch: Dispatch): Promise<void> => {
    return await firebase
      .database()
      .ref(FIREBASE_IMAGES_ROUTE)
      .child(imageFirebaseId)
      .remove((error: Error | null) => {
        if (error) {
          dispatch(displayErrorSnackbar('Error deleting image'));
        } else {
          firebase
            .storage()
            .ref(`images`)
            .child(imageId)
            .delete()
            .then(() => {
              dispatch(displaySuccessSnackbar('Deleted image.'));
            })
            .catch((e) => {
              console.error('delete image error: ' + JSON.stringify(e));
            });
        }
      });
  };
