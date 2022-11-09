// import firebase from 'firebase/app';
import 'firebase/storage';
import firebase from 'firebase/compat';
import { Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';

import { State } from '../configs/redux/store';
import { ApplicationActions } from '../creators/actions';
import { displayAppLoader } from '../creators/app-loader';
import {
  displayErrorSnackbar,
  displaySuccessSnackbar,
} from '../creators/app-snackbar';

import FirebaseStorageError = firebase.storage.FirebaseStorageError;

export const uploadImageFiles =
  (
    albumId: string,
    files: File[]
  ): ThunkAction<void, State, void, ApplicationActions> =>
  async (dispatch: Dispatch, getState: () => State): Promise<void> => {
    dispatch(displayAppLoader());

    const folderName = albumId;
    const errors: FirebaseStorageError[] = [];

    files.map(async (file) => {
      return await firebase
        .storage()
        .ref(`images/${albumId}/${file.name}`)
        .put(file)
        .catch((error: FirebaseStorageError) => errors.push(error));
    });

    if (errors.length > 0) {
      dispatch(displayErrorSnackbar(`Error saving file ${errors[0].name}.`));
    } else {
      dispatch(
        displaySuccessSnackbar(`Successfully saved images for ${folderName}.`)
      );
    }
  };

// https://firebasestorage.googleapis.com/v0/b/(project id).appspot.com/o/(storage path)?alt=media
