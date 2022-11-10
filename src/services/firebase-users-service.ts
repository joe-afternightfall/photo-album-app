import firebase from 'firebase/compat/app';
import { v4 as uuidv4 } from 'uuid';

import { auth } from '../configs/firebase/firebase-config';
import { FIREBASE_USERS_ROUTE } from '../configs/firebase/firebase-routes';
import { UserDAO } from '../configs/interfaces/user/UserDAO';
import { UserVO } from '../configs/interfaces/user/UserVO';
import { generateTimestamp } from '../utils/timestamp-generator';

export const getSignedInUserProfile = async (): Promise<UserVO | undefined> => {
  if (auth.currentUser) {
    console.log('auth.currentUser: ' + JSON.stringify(auth.currentUser));
    return await firebase
      .database()
      .ref(FIREBASE_USERS_ROUTE + '/' + auth.currentUser.uid)
      .once('value')
      .then(async (snapshot) => {
        const snap = snapshot.val();
        console.log('snap: ' + JSON.stringify(snap));
        if (snap) {
          const userVOS = Object.keys(snap).map((key: string): UserVO => {
            return {
              firebaseId: key,
              id: snap[key].id,
              username: snap[key].username,
              email: snap[key].email,
              favoriteImageIds: snap[key].favoriteImageIds,
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
