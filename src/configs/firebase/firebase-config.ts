import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyAmtjslIAv7wSCrqaW1-bYFksWgZzD-Fe0',
  authDomain: 'yarbro-photo-album-app.firebaseapp.com',
  databaseURL: 'https://yarbro-photo-album-app-default-rtdb.firebaseio.com',
  projectId: 'yarbro-photo-album-app',
  storageBucket: 'yarbro-photo-album-app.appspot.com',
  messagingSenderId: '994381391210',
  appId: '1:994381391210:web:d81c27145394528720b113',
  measurementId: 'G-PDN7054MMF',
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
