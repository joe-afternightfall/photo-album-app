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
          <AppRouter store={store} />
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
// todo: side drawer - implement logout
// todo: selected album screen - handle mobile multi select
// todo: admin - hide buttons and select menus unless user is admin
// todo: admin - app side drawer navigation to new users form
// todo: on delete, ask if should delete from album or permanent delete
// todo: selected album screen - fix infinite scrolling on
// todo: hide private albums for public users
// todo: hide private images for public users
// todo: add back delete/edit of album
// todo: get multi-delete working for admins

// ******* LATER_TODOS *******
// todo: need to test - how does downloading work for mobile devices / tablets
// todo: general - implement grouping photos in albums
// todo: firebase setup dont allow general users to save or write anything
// todo: firebase only allow general users to download or view public images
// todo: bulk editing toolbar delete photos for admin users
// todo: handle loading images on first load its rough, height is 0
