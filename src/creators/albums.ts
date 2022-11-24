import { AlbumVO, ImageVO } from '../configs/interfaces';
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
  images: ImageVO[];
}

export const selectAlbumToView = (
  album: AlbumVO,
  images: ImageVO[]
): SelectAlbumToViewAction => {
  return {
    type: ActionTypes.SELECT_ALBUM_TO_VIEW,
    album,
    images,
  };
};
