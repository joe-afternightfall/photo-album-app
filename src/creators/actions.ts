import { LocationChangeAction } from 'connected-react-router';

import { LoadAlbumsAction, SaveNewAlbumAction } from './albums';
import { LoggedInUserAction } from './user';

export enum ActionTypes {
  LOGGED_IN_USER = 'LOGGED_IN_USER',
  TOGGLE_APP_SIDE_DRAWER = 'TOGGLE_APP_SIDE_DRAWER',
  UPDATE_APP_THEME = 'UPDATE_APP_THEME',
  LOAD_ALBUMS = 'LOAD_ALBUMS',
  SAVE_NEW_ALBUM = 'SAVE_NEW_ALBUM',
}

export type ApplicationActions =
  | LocationChangeAction
  | LoadAlbumsAction
  | LoggedInUserAction
  | SaveNewAlbumAction;
