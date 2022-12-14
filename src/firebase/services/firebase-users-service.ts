import firebase from 'firebase/compat/app';
import isEmpty from 'is-empty';
import * as ramda from 'ramda';
import { Dispatch } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { v4 as uuidv4 } from 'uuid';

import {
  auth,
  createUserInstance,
} from '../../configs/firebase/firebase-config';
import { FIREBASE_USERS_ROUTE } from '../../configs/firebase/firebase-routes';
import { UserDAO } from '../../configs/interfaces/user/UserDAO';
import { UserVO } from '../../configs/interfaces/user/UserVO';
import { State } from '../../configs/redux/store';
import { ApplicationActions } from '../../creators/actions';
import { displayAppLoader, hideAppLoader } from '../../creators/app-loader';
import {
  displayErrorSnackbar,
  displaySuccessSnackbar,
} from '../../creators/app-snackbar';
import { closeUserInfoDialog } from '../../creators/dialogs/user-info';
import { loadUsers, loggedInUser } from '../../creators/user';
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
              isAdmin: snap[key].isAdmin,
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

export const getAllUsers = async (): Promise<UserVO[]> => {
  return await firebase
    .database()
    .ref(FIREBASE_USERS_ROUTE)
    .once('value')
    .then((snapshot) => {
      const snap = snapshot.val();
      if (snap) {
        const userList: UserVO[] = [];
        Object.keys(snap).map((key: string) => {
          Object.keys(snap[key]).map((innerKey) => {
            userList.push({
              firebaseId: key,
              id: snap[key][innerKey].id,
              isAdmin: snap[key][innerKey].isAdmin,
              username: snap[key][innerKey].username,
              email: snap[key][innerKey].email,
              favoriteImageIds: snap[key][innerKey].favoriteImageIds,
              created: snap[key][innerKey].created,
              updated: snap[key][innerKey].updated,
            });
          });
        });
        return userList;
      } else {
        return [];
      }
    });
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
    isAdmin: false,
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

export interface EditUserFormInfo {
  email: string;
  username: string;
  isAdmin: boolean;
}

export interface NewUserFormInfo extends EditUserFormInfo {
  password: string;
}

export const createNewUser =
  (info: NewUserFormInfo): ThunkAction<void, State, void, ApplicationActions> =>
  async (dispatch: Dispatch): Promise<void> => {
    await createUserInstance
      .auth()
      .createUserWithEmailAndPassword(info.email, info.password)
      .then(async (e) => {
        if (e.user?.email) {
          const timestamp = generateTimestamp();
          const userInfo: UserDAO = {
            id: uuidv4(),
            isAdmin: info.isAdmin,
            username: info.username,
            email: info.email,
            favoriteImageIds: [],
            created: timestamp,
            updated: timestamp,
          };
          await firebase
            .database()
            .ref(FIREBASE_USERS_ROUTE + '/' + e.user?.uid)
            .push(userInfo, async (error) => {
              if (error) {
                console.log(
                  'error creating new user: ' + JSON.stringify(error)
                );
                dispatch(displayErrorSnackbar('Error creating new user.'));
              } else {
                dispatch(displayAppLoader());
                dispatch(closeUserInfoDialog());
                dispatch(displaySuccessSnackbar('Created new user.'));
                const users = await getAllUsers();
                dispatch(loadUsers(users));
                setTimeout(() => {
                  dispatch(hideAppLoader());
                }, 350);
              }
            });
        }
      })
      .catch((e) => {
        console.log('error creating new user: ' + JSON.stringify(e));
        dispatch(displayErrorSnackbar('Error creating new user.'));
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

export const removeSelectedImageIdsFromUsersFavoriteList =
  (): ThunkAction<void, State, void, ApplicationActions> =>
  async (dispatch: Dispatch, getState: () => State): Promise<void> => {
    const signedInUser = getState().applicationState.signedInUser;
    const selectedIds =
      getState().selectedAlbumState.selectedImageIdsForMultiEditing;

    if (signedInUser) {
      const clonedImageIds = ramda.clone(signedInUser.favoriteImageIds);

      selectedIds.map((selectedImageId) => {
        const foundImage = clonedImageIds.find((id) => id === selectedImageId);

        if (foundImage) {
          const foundIndex = clonedImageIds.indexOf(foundImage);
          if (foundIndex !== -1) {
            clonedImageIds.splice(foundIndex, 1);
          }
        }
      });

      (dispatch as ThunkDispatch<State, void, ApplicationActions>)(
        updateFavoritesList(clonedImageIds)
      );
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

export const tagSelectedImagesAsFavorites =
  (): ThunkAction<void, State, void, ApplicationActions> =>
  async (dispatch: Dispatch, getState: () => State): Promise<void> => {
    const signedInUser = getState().applicationState.signedInUser;
    const selectedIds =
      getState().selectedAlbumState.selectedImageIdsForMultiEditing;
    const clonedFavoriteImageIds = ramda.clone(
      signedInUser ? signedInUser.favoriteImageIds : []
    );

    selectedIds.map((imageId: string) => {
      const foundImageIdInFavsList = clonedFavoriteImageIds.find(
        (favId) => favId === imageId
      );
      if (isEmpty(foundImageIdInFavsList)) {
        clonedFavoriteImageIds.push(imageId);
      }
    });

    (dispatch as ThunkDispatch<State, void, ApplicationActions>)(
      updateFavoritesList(clonedFavoriteImageIds)
    );
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
              dispatch(displaySuccessSnackbar('Updated favorites'));
            }
          }
        );
    }
  };
