import { ImageVO } from '../configs/interfaces';
import { ActionTypes } from './actions';

export interface LoadImagesAction {
  type: ActionTypes.LOAD_IMAGES;
  images: ImageVO[];
}

export const loadImages = (images: ImageVO[]): LoadImagesAction => {
  return {
    type: ActionTypes.LOAD_IMAGES,
    images,
  };
};
