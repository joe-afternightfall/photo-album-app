import firebase from 'firebase/compat/app';
import { v4 as uuidv4 } from 'uuid';
import 'firebase/compat/database';

import { FIREBASE_REQUEST_ACCESS_ROUTE } from '../../configs/firebase/firebase-routes';
import { AccessRequestDAO } from '../../configs/interfaces/access-request/AccessRequestDAO';
import { AccessRequestVO } from '../../configs/interfaces/access-request/AccessRequestVO';
import { generateTimestamp } from '../../utils/timestamp-generator';

export const getAllNewUserRequests = async (): Promise<AccessRequestVO[]> => {
  return await firebase
    .database()
    .ref(FIREBASE_REQUEST_ACCESS_ROUTE)
    .once('value')
    .then((snapshot) => {
      const snap = snapshot.val();
      console.log('snap: ' + JSON.stringify(snap));
      if (snap) {
        return Object.keys(snap).map(
          (key: string): AccessRequestVO => ({
            firebaseId: key,
            id: snap[key].id,
            name: snap[key].name,
            email: snap[key].email,
            created: snap[key].created,
          })
        );
      } else {
        return [];
      }
    });
};

export const submitRequest = async (name: string, email: string) => {
  const ref = firebase.database().ref(FIREBASE_REQUEST_ACCESS_ROUTE);
  const newRef = ref.push();

  const newRequest: AccessRequestDAO = {
    id: uuidv4(),
    email,
    name,
    created: generateTimestamp(),
  };

  return await newRef.set(newRequest, (error: Error | null) => {
    if (error) {
      console.error('error: ' + JSON.stringify(error));
    }
  });
};
