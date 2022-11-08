import firebase from 'firebase/compat/app';

import 'firebase/compat/database';
import { FIREBASE_ALBUMS_ROUTE } from '../configs/firebase/firebase-routes';
import { AlbumDAO, AlbumVO } from '../configs/interfaces';

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
            imageId: snap[key].imageId,
            created: snap[key].created,
            updated: snap[key].updated,
          };
        });
      } else {
        return [];
      }
    });
};
