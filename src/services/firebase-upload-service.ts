import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';
import { ThunkAction } from 'redux-thunk';
import { v4 as uuidv4 } from 'uuid';

import { FIREBASE_IMAGES_ROUTE } from '../configs/firebase/firebase-routes';
import { ImageDAO } from '../configs/interfaces';
import { State } from '../configs/redux/store';
import { ApplicationActions } from '../creators/actions';
import { generateTimestamp } from '../utils/timestamp-generator';

export const uploadImageFiles =
  (
    albumId: string,
    files: File[],
    callback?: () => void
  ): ThunkAction<void, State, void, ApplicationActions> =>
  async (): Promise<void> => {
    files.map(async (file) => {
      const storageRef = firebase
        .storage()
        .ref(`images/${albumId}/${file.name}`);

      await storageRef.put(file);

      const downloadURL = await storageRef.getDownloadURL();
      const timestamp = generateTimestamp();

      const imageInfo: ImageDAO = {
        id: uuidv4(),
        nickname: '',
        fileName: file.name,
        tagIds: [],
        downloadURL: downloadURL,
        albumId: albumId,
        hideFromGeneralViewing: false,
        created: timestamp,
        updated: timestamp,
      };

      const ref = firebase.database().ref(FIREBASE_IMAGES_ROUTE);
      const newRef = ref.push();

      return await newRef.set(imageInfo, (e: Error | null) => {
        if (e) {
          console.error('e: ' + JSON.stringify(e));
        } else {
          console.log('success');
        }
      });
    });

    callback && callback();
  };
