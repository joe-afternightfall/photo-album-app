import { ImageVO } from '../configs/interfaces';
import { ACCESS_TYPE } from '../configs/interfaces/image/ImageDAO';
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

export interface FilterImagesByAccessTypeAction {
  type: ActionTypes.FILTER_IMAGES_BY_ACCESS_TYPE;
  accessType: ACCESS_TYPE;
}

export const filterImagesByAccessType = (
  accessType: ACCESS_TYPE
): FilterImagesByAccessTypeAction => {
  return {
    type: ActionTypes.FILTER_IMAGES_BY_ACCESS_TYPE,
    accessType,
  };
};
