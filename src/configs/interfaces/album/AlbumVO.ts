import { ImageVO } from '../image';
import { BaseAlbum } from './BaseAlbum';

export interface AlbumVO extends BaseAlbum {
  firebaseId: string;
  images: ImageVO[];
}
