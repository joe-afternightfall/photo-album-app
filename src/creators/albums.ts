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
