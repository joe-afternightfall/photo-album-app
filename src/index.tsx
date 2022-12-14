import { ConnectedRouter } from 'connected-react-router';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import '@fontsource/montserrat'; // Defaults to weight 400.

import AppRouter from './AppRouter';
import { store, history } from './configs/redux/store';
import { AuthProvider } from './firebase/auth/AuthProvider';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <AppRouter />
        </ConnectedRouter>
      </Provider>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

// ******* PRIORITY *******
// todo: if user is admin, display total photos, if not display total public photos
// todo: selected album screen - handle mobile multi select
// todo: allow admin to create new users / delete users
// todo: favorites toolbar, on download pop menu asking for confirmation and then show spinner while waiting for zipping of images
// todo: firebase database config setup dont allow general users to save or write anything
// todo: firebase only allow general users to download or view public images

// ******* LATER_TODOS *******
// todo: need to update users favorite id's when deleting an image
// todo: need to test - how does downloading work for mobile devices / tablets
// todo: general - implement grouping photos in albums
// todo: handle loading images on first load its rough, height is 0
// todo: add search bar to search by image name
// todo: need to create "images without album" album
// todo: display images with no album

// ******* ERRORS_OR_BUGS *******
// todo: error with deleting image, it works but i am popping error snackbar, something in the chain is failing
