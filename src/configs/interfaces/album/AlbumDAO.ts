import { BaseAlbum } from './BaseAlbum';

export interface AlbumDAO extends BaseAlbum {
  imageIds: string[];
}
