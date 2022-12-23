import { initializeAppCheck, ReCaptchaV3Provider } from 'firebase/app-check';
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
const app = firebase.initializeApp(firebaseConfig);
export const createUserInstance = firebase.initializeApp(
  firebaseConfig,
  'sign-up-instance'
);
initializeAppCheck(app, {
  provider: new ReCaptchaV3Provider('6LdThxEjAAAAAJtE96MzgyI3hHgN17Aq01_W8l0Q'),

  // Optional argument. If true, the SDK automatically refreshes App Check
  // tokens as needed.
  isTokenAutoRefreshEnabled: true,
});

export const auth = firebase.auth();
