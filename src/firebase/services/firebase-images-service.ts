import firebase from 'firebase/compat/app';
import { Dispatch } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';

import { FIREBASE_IMAGES_ROUTE } from '../../configs/firebase/firebase-routes';
import { ImageVO } from '../../configs/interfaces';
import { ACCESS_TYPE } from '../../configs/interfaces/image/ImageDAO';
import { State } from '../../configs/redux/store';
import { ApplicationActions } from '../../creators/actions';
import { displayAppLoader } from '../../creators/app-loader';
import {
  displayErrorSnackbar,
  displaySuccessSnackbar,
} from '../../creators/app-snackbar';
import { mapImageSnapToVO } from '../../utils/mapper';
import { deleteImageFromStorage } from './firebase-storage-service';

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
          (dispatch as ThunkDispatch<State, void, ApplicationActions>)(
            deleteImageFromStorage(imageId)
          );
          // todo: update album ids after delete
          // (dispatch as ThunkDispatch<State, void, ApplicationActions>)(
          //   deleteImageFromStorage(imageId)
          // );
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
