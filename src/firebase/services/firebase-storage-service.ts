import firebase from 'firebase/compat/app';
import { Dispatch } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { v4 as uuidv4 } from 'uuid';

import { FIREBASE_IMAGES_ROUTE } from '../../configs/firebase/firebase-routes';
import { ImageDAO } from '../../configs/interfaces';
import { ACCESS_TYPE } from '../../configs/interfaces/image/ImageDAO';
import { State } from '../../configs/redux/store';
import { ApplicationActions } from '../../creators/actions';
import { displayAppLoader, hideAppLoader } from '../../creators/app-loader';
import {
  displayErrorSnackbar,
  displaySuccessSnackbar,
} from '../../creators/app-snackbar';
import { generateTimestamp } from '../../utils/timestamp-generator';
import { addImageIdsToAlbum } from './firebase-albums-service';

export const uploadImages =
  (
    albumId: string,
    files: File[],
    callback?: () => void
  ): ThunkAction<void, State, void, ApplicationActions> =>
  async (dispatch: Dispatch): Promise<void> => {
    dispatch(displayAppLoader());
    const errors: string[] = [];
    const totalFiles = files.length;
    const firebaseImageIdsToAdd: string[] = [];

    await Promise.all(
      files.map(async (file) => {
        const imageId = uuidv4();
        const storageRef = firebase.storage().ref(`images/${imageId}`);
        await storageRef.put(file);

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
      addImageIdsToAlbum(firebaseImageIdsToAdd)
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

export const deleteImageFromStorage =
  (imageId: string): ThunkAction<void, State, void, ApplicationActions> =>
  async (dispatch: Dispatch): Promise<void> => {
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
  };
