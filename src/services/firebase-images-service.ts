import firebase from 'firebase/compat/app';
import 'firebase/compat/database';

import { FIREBASE_IMAGES_ROUTE } from '../configs/firebase/firebase-routes';
import { ImageVO } from '../configs/interfaces';

export const getAllImages = async (): Promise<ImageVO[]> => {
  return await firebase
    .database()
    .ref(FIREBASE_IMAGES_ROUTE)
    .once('value')
    .then((snapshot) => {
      const snap = snapshot.val();
      if (snap) {
        return Object.keys(snap).map((key: string): ImageVO => {
          return {
            firebaseId: key,
            id: snap[key].id,
            nickname: snap[key].nickname,
            fileName: snap[key].fileName,
            tagIds: snap[key].tagIds,
            downloadURL: snap[key].downloadURL,
            albumId: snap[key].albumId,
            accessType: snap[key].accessType,
            created: snap[key].created,
            updated: snap[key].updated,
          };
        });
      } else {
        return [];
      }
    });
};
