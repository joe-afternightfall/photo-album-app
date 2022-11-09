import { AlbumVO } from '../configs/interfaces';
import { ActionTypes } from './actions';

export interface LoadAlbumsAction {
  type: ActionTypes.LOAD_ALBUMS;
  albums: AlbumVO[];
}

export const loadAlbums = (albums: AlbumVO[]): LoadAlbumsAction => {
  return {
    type: ActionTypes.LOAD_ALBUMS,
    albums,
  };
};

export interface SelectAlbumToViewAction {
  type: ActionTypes.SELECT_ALBUM_TO_VIEW;
  album: AlbumVO;
}

export const selectAlbumToView = (album: AlbumVO): SelectAlbumToViewAction => {
  return {
    type: ActionTypes.SELECT_ALBUM_TO_VIEW,
    album,
  };
};
