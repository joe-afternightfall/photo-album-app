import firebase from 'firebase/compat/app';
import { Store } from 'redux';

import {
  FIREBASE_ALBUMS_ROUTE,
  FIREBASE_IMAGES_ROUTE,
  FIREBASE_REQUEST_ACCESS_ROUTE,
} from '../configs/firebase/firebase-routes';
import { loadAlbums } from '../creators/albums';
import { loadImages } from '../creators/images';
import { loadNewUserRequests } from '../creators/new-user-requests';
import { getAllAlbums } from './services/firebase-albums-service';
import { getAllImages } from './services/firebase-images-service';
import { getAllNewUserRequests } from './services/request-access';

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
      {
        ref: firebase.database().ref(FIREBASE_IMAGES_ROUTE),
        updateMethod: async () => {
          const images = await getAllImages();
          this.store.dispatch(loadImages(images));
        },
      },
      {
        ref: firebase.database().ref(FIREBASE_REQUEST_ACCESS_ROUTE),
        updateMethod: async () => {
          const requests = await getAllNewUserRequests();
          this.store.dispatch(loadNewUserRequests(requests));
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
