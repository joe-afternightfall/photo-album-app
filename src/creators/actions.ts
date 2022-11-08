import { LocationChangeAction } from 'connected-react-router';

import { LoadAlbumsAction } from './albums';

export enum ActionTypes {
  LOGGED_IN_USER = 'LOGGED_IN_USER',
  TOGGLE_APP_SIDE_DRAWER = 'TOGGLE_APP_SIDE_DRAWER',
  UPDATE_APP_THEME = 'UPDATE_APP_THEME',
  LOAD_ALBUMS = 'LOAD_ALBUMS',
}

export type ApplicationActions = LocationChangeAction | LoadAlbumsAction;
