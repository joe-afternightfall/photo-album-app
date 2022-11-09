import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBM3-aEnkxjG278mH6A4TyhzDfiyfhAiDY',
  authDomain: 'yarbro-photo-album.firebaseapp.com',
  databaseURL: 'https://yarbro-photo-album-default-rtdb.firebaseio.com',
  projectId: 'yarbro-photo-album',
  storageBucket: 'yarbro-photo-album.appspot.com',
  messagingSenderId: '984232887444',
  appId: '1:984232887444:web:ba095afcfb9859aa4e6081',
  measurementId: 'G-SP6Z58C6H7',
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
