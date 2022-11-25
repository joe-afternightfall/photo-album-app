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
import { ToggleUploadImagesDialogAction } from './dialogs/upload-images';
import { FilterImagesByAccessTypeAction, LoadImagesAction } from './images';
import { LoadNewUserRequestsAction } from './new-user-requests';
import { ToggleFavoritesAction } from './selected-album/favorites';
import {
  ClearMultiSelectIdsAction,
  ToggleMultiSelectModeAction,
  UpdateHoveringOverIconIdAction,
  UpdateMultiSelectIdsAction,
} from './selected-album/multi-select-mode';
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
  TOGGLE_MULTI_SELECT_MODE = 'TOGGLE_MULTI_SELECT_MODE',
  UPDATE_MULTI_SELECT_IDS = 'UPDATE_MULTI_SELECT_IDS',
  CLEAR_MULTI_SELECT_IDS = 'CLEAR_MULTI_SELECT_IDS',
  UPDATE_HOVERING_OVER_ICON_ID = 'UPDATE_HOVERING_OVER_ICON_ID',
  TOGGLE_FAVORITES = 'TOGGLE_FAVORITES',

  // App Dialog Actions
  TOGGLE_ALBUM_INFO_DIALOG = 'TOGGLE_ALBUM_INFO_DIALOG',
  TOGGLE_DELETE_IMAGE_DIALOG = 'TOGGLE_DELETE_IMAGE_DIALOG',
  TOGGLE_DELETE_ALBUM_DIALOG = 'TOGGLE_DELETE_ALBUM_DIALOG',
  TOGGLE_UPLOAD_IMAGES_DIALOG = 'TOGGLE_UPLOAD_IMAGES_DIALOG',
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
  | LoadNewUserRequestsAction
  | ToggleMultiSelectModeAction
  | UpdateMultiSelectIdsAction
  | ClearMultiSelectIdsAction
  | UpdateHoveringOverIconIdAction
  | ToggleFavoritesAction
  | ToggleUploadImagesDialogAction;
