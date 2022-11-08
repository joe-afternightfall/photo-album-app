import { AlbumDAO } from './AlbumDAO';

export interface AlbumVO extends AlbumDAO {
  firebaseId: string;
}
