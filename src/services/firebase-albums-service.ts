import firebase from 'firebase/compat/app';
import { Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { v4 as uuidv4 } from 'uuid';
import 'firebase/compat/database';

import { FIREBASE_ALBUMS_ROUTE } from '../configs/firebase/firebase-routes';
import { AlbumDAO, AlbumVO } from '../configs/interfaces';
import { State } from '../configs/redux/store';
import { ApplicationActions } from '../creators/actions';
import { displayAppLoader, hideAppLoader } from '../creators/app-loader';
import {
  displayErrorSnackbar,
  displaySuccessSnackbar,
} from '../creators/app-snackbar';
import { generateTimestamp } from '../utils/timestamp-generator';

export const getAllAlbums = async (): Promise<AlbumVO[]> => {
  return await firebase
    .database()
    .ref(FIREBASE_ALBUMS_ROUTE)
    .once('value')
    .then((snapshot) => {
      const snap = snapshot.val();
      if (snap) {
        return Object.keys(snap).map((key: string): AlbumVO => {
          return {
            firebaseId: key,
            id: snap[key].id,
            title: snap[key].title,
            subtitle: snap[key].subtitle,
            coverImageDownloadURL: snap[key].coverImageDownloadURL,
            images: snap[key].images,
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
  image?: File;
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
      images: [],
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

export const updateAlbum =
  (
    info: NewAlbumInfo,
    successCallback?: () => void
  ): ThunkAction<void, State, void, ApplicationActions> =>
  async (dispatch: Dispatch): Promise<void> => {
    dispatch(displayAppLoader());
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
