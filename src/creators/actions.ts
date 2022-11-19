import { LocationChangeAction } from 'connected-react-router';

import { LoadAlbumsAction, SelectAlbumToViewAction } from './albums';
import { ToggleAppLoaderAction } from './app-loader';
import {
  DisplayAppSnackbarAction,
  HideAppSnackbarAction,
} from './app-snackbar';
import {
  ToggleAlbumInfoDialogAction,
  ToggleDeleteAlbumDialog,
} from './dialogs/album-info';
import { ToggleDeleteImageDialogAction } from './dialogs/delete-image';
import { FilterImagesByAccessTypeAction, LoadImagesAction } from './images';
import { LoadNewUserRequestsAction } from './new-user-requests';
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
  FILTER_IMAGES_BY_ACCESS_TYPE = 'FILTER_IMAGES_BY_ACCESS_TYPE',
  LOAD_NEW_USER_REQUESTS = 'LOAD_NEW_USER_REQUESTS',

  // App Dialog Actions
  TOGGLE_ALBUM_INFO_DIALOG = 'TOGGLE_ALBUM_INFO_DIALOG',
  TOGGLE_DELETE_IMAGE_DIALOG = 'TOGGLE_DELETE_IMAGE_DIALOG',
  TOGGLE_DELETE_ALBUM_DIALOG = 'TOGGLE_DELETE_ALBUM_DIALOG',
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
  | ToggleAlbumInfoDialogAction
  | ToggleDeleteImageDialogAction
  | ToggleDeleteAlbumDialog
  | FilterImagesByAccessTypeAction
  | LoadNewUserRequestsAction;
