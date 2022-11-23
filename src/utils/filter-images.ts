import * as ramda from 'ramda';

import { AlbumVO, ImageVO } from '../configs/interfaces';
import { ACCESS_TYPE } from '../configs/interfaces/image/ImageDAO';

export const filterImagesForAccessType = (
  album: AlbumVO,
  images: ImageVO[],
  accessType: ACCESS_TYPE
): ImageVO[] => {
  let albumImages: ImageVO[] = [];

  images.forEach((image) => {
    if (image.albumId === album.id) {
      albumImages.push(image);
    }
  });

  switch (accessType) {
    case ACCESS_TYPE.UNDEFINED: {
      const clonedImages = ramda.clone(albumImages);
      albumImages = clonedImages.filter(
        (image) => image.accessType === ACCESS_TYPE.UNDEFINED
      );
      break;
    }
    case ACCESS_TYPE.PUBLIC: {
      const clonedImages = ramda.clone(albumImages);
      albumImages = clonedImages.filter(
        (image) => image.accessType === ACCESS_TYPE.PUBLIC
      );
      break;
    }
    case ACCESS_TYPE.PRIVATE: {
      const clonedImages = ramda.clone(albumImages);
      albumImages = clonedImages.filter(
        (image) => image.accessType === ACCESS_TYPE.PRIVATE
      );
      break;
    }
    default:
      break;
  }

  return albumImages;
};
