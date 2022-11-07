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

export const createStore = (history: History): Store => {
  const createStoreFunc = applyMiddleware(
      thunkMiddleware,
      routerMiddleware(history)
    )(originalCreateStore),
    allReducers = combineReducers({
      router: connectRouter(history),
      routing: routerReducer,
      applicationState: application.reducer,
    });

  return createStoreFunc(allReducers, {
    applicationState: {
      currentLocation: '',
      /*snackbarProps: {
        message: '',
        severity: 'success',
        position: {
          vertical: 'bottom',
          horizontal: 'right',
        },
      },
      displayAppLoader: true,
      displaySkeletonApp: true,*/
      // appData: {
      //   users: [],
      //   images: [],
      // },
      // loggedInUser: undefined,
      // userHasAdminPrivileges: false,
    } as ApplicationState,
  });
};

export interface State {
  applicationState: ApplicationState;
}

export const history = createHashHistory();
export const store = createStore(history);
