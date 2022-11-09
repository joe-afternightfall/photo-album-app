// import firebase from 'firebase/app';
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';
import { Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { v4 as uuidv4 } from 'uuid';

import { FIREBASE_IMAGES_ROUTE } from '../configs/firebase/firebase-routes';
import { ImageDAO, ImageVO } from '../configs/interfaces';
import { State } from '../configs/redux/store';
import { ApplicationActions } from '../creators/actions';
import { displayAppLoader } from '../creators/app-loader';
import {
  displayErrorSnackbar,
  displaySuccessSnackbar,
} from '../creators/app-snackbar';
import { generateTimestamp } from '../utils/timestamp-generator';

// import FirebaseStorageError = firebase.storage.FirebaseStorageError;

export const uploadImageFiles =
  (
    albumId: string,
    files: File[],
    callback?: () => void
  ): ThunkAction<void, State, void, ApplicationActions> =>
  async (dispatch: Dispatch, getState: () => State): Promise<void> => {
    dispatch(displayAppLoader());

    const folderName = albumId;
    // const errors = [];

    files.map(async (file) => {
      const storageRef = firebase
        .storage()
        .ref(`images/${albumId}/${file.name}`);

      // await storageRef.put(file).catch((e) => errors.push(e));
      await storageRef.put(file);

      const downloadURL = await storageRef.getDownloadURL();
      const timestamp = generateTimestamp();

      console.log('******* downloadURL: ' + JSON.stringify(downloadURL));

      const imageInfo: ImageDAO = {
        id: uuidv4(),
        nickname: '',
        fileName: file.name,
        tagIds: [],
        downloadURL: downloadURL,
        albumId: albumId,
        hideFromGeneralViewing: false,
        created: timestamp,
        updated: timestamp,
      };

      const ref = firebase.database().ref(FIREBASE_IMAGES_ROUTE);
      const newRef = ref.push();

      return await newRef.set(imageInfo, (e: Error | null) => {
        if (e) {
          console.log('e: ' + JSON.stringify(e));
        } else {
          console.log('success');
        }
      });
    });

    // if (errors.length > 0) {
    //   dispatch(displayErrorSnackbar(`Error saving images ${errors[0].name}.`));
    // } else {
    //   dispatch(displaySuccessSnackbar('Successfully saved images'));
    // }
  };

// https://firebasestorage.googleapis.com/v0/b/(project id).appspot.com/o/(storage path)?alt=media
