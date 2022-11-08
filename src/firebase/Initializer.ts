import firebase from 'firebase/compat/app';
import { Store } from 'redux';

import { FIREBASE_ALBUMS_ROUTE } from '../configs/firebase/firebase-routes';
import { loadAlbums } from '../creators/albums';
import { getAllAlbums } from '../services/firebase-albums-service';

export class Initializer {
  store: Store;

  constructor(store: Store) {
    this.store = store;
  }

  initializeFirebase(): void {
    const refArray = [
      {
        ref: firebase.database().ref(FIREBASE_ALBUMS_ROUTE),
        updateMethod: async () => {
          const albums = await getAllAlbums();
          this.store.dispatch(loadAlbums(albums));
        },
      },
    ];

    refArray.map((entry) => {
      entry.ref.on('child_added', async () => {
        await entry.updateMethod();
      });

      entry.ref.on('child_changed', async () => {
        await entry.updateMethod();
      });

      entry.ref.on('child_removed', async () => {
        await entry.updateMethod();
      });
    });
  }
}
