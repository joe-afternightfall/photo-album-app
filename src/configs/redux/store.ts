import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createHashHistory, History } from 'history';
import { routerReducer } from 'react-router-redux';
import {
  applyMiddleware,
  combineReducers,
  createStore as originalCreateStore,
  Store,
} from 'redux';
import thunkMiddleware from 'redux-thunk';

import application, { ApplicationState } from '../../reducers/application';
import dialogs, { AppDialogState } from '../../reducers/dialogs';
import { ACCESS_TYPE } from '../interfaces/image/ImageDAO';

export const createStore = (history: History): Store => {
  const createStoreFunc = applyMiddleware(
      thunkMiddleware,
      routerMiddleware(history)
    )(originalCreateStore),
    allReducers = combineReducers({
      router: connectRouter(history),
      routing: routerReducer,
      applicationState: application.reducer,
      appDialogState: dialogs.reducer,
    });

  return createStoreFunc(allReducers, {
    applicationState: {
      userIsAdmin: false,
      newUserRequests: [],
      currentLocation: '',
      displayAppSnackbar: false,
      albums: [],
      displayAppLoader: false,
      images: [],
      snackbarProps: {
        message: '',
        severity: 'success',
        position: {
          vertical: 'bottom',
          horizontal: 'right',
        },
      },
      filterImagesForAccessType: ACCESS_TYPE.ALL,
      // displayAppLoader: true,
      // displaySkeletonApp: true,
      // appData: {
      //   users: [],
      //   images: [],
      // },
      // loggedInUser: undefined,
      // userHasAdminPrivileges: false,
    } as ApplicationState,
    appDialogState: {
      albumInfoDialog: {
        display: false,
        selectedAlbumToEdit: undefined,
      },
      deleteImageDialog: {
        display: false,
        imageId: '',
        imageFirebaseId: '',
      },
      deleteAlbumDialog: {
        display: false,
      },
    } as AppDialogState,
  } as State);
};

export interface State {
  applicationState: ApplicationState;
  appDialogState: AppDialogState;
}

export const history = createHashHistory();
export const store = createStore(history);
