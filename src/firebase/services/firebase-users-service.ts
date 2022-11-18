import firebase from 'firebase/compat/app';
import * as ramda from 'ramda';
import { Dispatch } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { v4 as uuidv4 } from 'uuid';

import { auth } from '../../configs/firebase/firebase-config';
import { FIREBASE_USERS_ROUTE } from '../../configs/firebase/firebase-routes';
import { UserDAO } from '../../configs/interfaces/user/UserDAO';
import { UserVO } from '../../configs/interfaces/user/UserVO';
import { State } from '../../configs/redux/store';
import { ApplicationActions } from '../../creators/actions';
import { loggedInUser } from '../../creators/user';
import { generateTimestamp } from '../../utils/timestamp-generator';

export const getSignedInUserProfile = async (): Promise<UserVO | undefined> => {
  if (auth.currentUser) {
    return await firebase
      .database()
      .ref(FIREBASE_USERS_ROUTE + '/' + auth.currentUser.uid)
      .once('value')
      .then(async (snapshot) => {
        const snap = snapshot.val();
        if (snap) {
          const userVOS = Object.keys(snap).map((key: string): UserVO => {
            return {
              firebaseId: key,
              id: snap[key].id,
              username: snap[key].username,
              email: snap[key].email,
              favoriteImageIds: snap[key].favoriteImageIds ?? [],
              created: snap[key].created,
              updated: snap[key].updated,
            };
          });

          if (userVOS.length) {
            return userVOS[0];
          }
        } else {
          return await saveNewUser();
        }
      });
  }
};

export const saveNewUser = async (): Promise<UserVO> => {
  const ref = firebase
    .database()
    .ref(FIREBASE_USERS_ROUTE + '/' + auth.currentUser?.uid);
  const newRef = ref.push();

  const timestamp = generateTimestamp();

  const newUser: UserDAO = {
    id: uuidv4(),
    username: '',
    email:
      auth.currentUser && auth.currentUser.email ? auth.currentUser.email : '',
    favoriteImageIds: [],
    created: timestamp,
    updated: timestamp,
  };

  return await newRef.set(newUser, (error: Error | null) => {
    if (error) {
      console.error('error: ' + JSON.stringify(error));
    }
  });
};

export const removeImageFromUsersFavoriteList =
  (imageId: string): ThunkAction<void, State, void, ApplicationActions> =>
  async (dispatch: Dispatch, getState: () => State): Promise<void> => {
    const signedInUser = getState().applicationState.signedInUser;
    if (signedInUser) {
      const clonedImageIds = ramda.clone(signedInUser.favoriteImageIds);
      const foundImage = clonedImageIds.find((id) => id === imageId);

      if (foundImage) {
        const foundIndex = clonedImageIds.indexOf(foundImage);
        if (foundIndex !== -1) {
          clonedImageIds.splice(foundIndex, 1);

          (dispatch as ThunkDispatch<State, void, ApplicationActions>)(
            updateFavoritesList(clonedImageIds)
          );
        }
      }
    }
  };

export const tagImageAsFavorite =
  (imageId: string): ThunkAction<void, State, void, ApplicationActions> =>
  async (dispatch: Dispatch, getState: () => State): Promise<void> => {
    const signedInUser = getState().applicationState.signedInUser;
    if (signedInUser) {
      const clonedImageIds = ramda.clone(signedInUser.favoriteImageIds);
      clonedImageIds.push(imageId);

      (dispatch as ThunkDispatch<State, void, ApplicationActions>)(
        updateFavoritesList(clonedImageIds)
      );
    }
  };

const updateFavoritesList =
  (imageIds: string[]): ThunkAction<void, State, void, ApplicationActions> =>
  async (dispatch: Dispatch, getState: () => State): Promise<void> => {
    const signedInUser = getState().applicationState.signedInUser;
    if (signedInUser && auth.currentUser) {
      return await firebase
        .database()
        .ref(FIREBASE_USERS_ROUTE + '/' + auth.currentUser.uid)
        .child(signedInUser.firebaseId)
        .update(
          {
            favoriteImageIds: imageIds,
            updated: generateTimestamp(),
          },
          async (error: Error | null) => {
            if (error) {
              console.error('error: ' + JSON.stringify(error));
            } else {
              const userProfile = await getSignedInUserProfile();
              dispatch(loggedInUser(userProfile));
            }
          }
        );
    }
  };
