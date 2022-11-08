import { ImageDAO } from './ImageDAO';

export interface ImageVO extends ImageDAO {
  firebaseId: string;
}
