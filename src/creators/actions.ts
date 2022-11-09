import { LocationChangeAction } from 'connected-react-router';

import { LoadAlbumsAction } from './albums';
import { ToggleAppLoaderAction } from './app-loader';
import {
  DisplayAppSnackbarAction,
  HideAppSnackbarAction,
} from './app-snackbar';
import { LoggedInUserAction } from './user';

export enum ActionTypes {
  LOGGED_IN_USER = 'LOGGED_IN_USER',
  TOGGLE_APP_SIDE_DRAWER = 'TOGGLE_APP_SIDE_DRAWER',
  UPDATE_APP_THEME = 'UPDATE_APP_THEME',
  LOAD_ALBUMS = 'LOAD_ALBUMS',
  SAVE_NEW_ALBUM = 'SAVE_NEW_ALBUM',
  DISPLAY_APP_SNACKBAR = 'DISPLAY_APP_SNACKBAR',
  HIDE_APP_SNACKBAR = 'HIDE_APP_SNACKBAR',
  TOGGLE_APP_LOADER = 'TOGGLE_APP_LOADER',
}

export type ApplicationActions =
  | LocationChangeAction
  | LoadAlbumsAction
  | LoggedInUserAction
  | DisplayAppSnackbarAction
  | HideAppSnackbarAction
  | ToggleAppLoaderAction;
