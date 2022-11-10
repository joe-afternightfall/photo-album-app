import { LocationChangeAction } from 'connected-react-router';

import { LoadAlbumsAction, SelectAlbumToViewAction } from './albums';
import { ToggleAppLoaderAction } from './app-loader';
import {
  DisplayAppSnackbarAction,
  HideAppSnackbarAction,
} from './app-snackbar';
import { ToggleAlbumInfoDialogAction } from './dialogs/album-info';
import { LoadImagesAction } from './images';
import { LoggedInUserAction } from './user';

export enum ActionTypes {
  LOGGED_IN_USER = 'LOGGED_IN_USER',
  TOGGLE_APP_SIDE_DRAWER = 'TOGGLE_APP_SIDE_DRAWER',
  UPDATE_APP_THEME = 'UPDATE_APP_THEME',
  LOAD_ALBUMS = 'LOAD_ALBUMS',
  SELECT_ALBUM_TO_VIEW = 'SELECT_ALBUM_TO_VIEW',
  DISPLAY_APP_SNACKBAR = 'DISPLAY_APP_SNACKBAR',
  HIDE_APP_SNACKBAR = 'HIDE_APP_SNACKBAR',
  TOGGLE_APP_LOADER = 'TOGGLE_APP_LOADER',
  LOAD_IMAGES = 'LOAD_IMAGES',

  // App Dialog Actions
  TOGGLE_ALBUM_INFO_DIALOG = 'TOGGLE_ALBUM_INFO_DIALOG',
}

export type ApplicationActions =
  | LocationChangeAction
  | LoadAlbumsAction
  | LoggedInUserAction
  | DisplayAppSnackbarAction
  | HideAppSnackbarAction
  | ToggleAppLoaderAction
  | SelectAlbumToViewAction
  | LoadImagesAction
  | ToggleAlbumInfoDialogAction;
