import * as ramda from 'ramda';

import { AlbumVO, ImageVO } from '../configs/interfaces';
import { ACCESS_TYPE } from '../configs/interfaces/image/ImageDAO';

export const filterImagesForAccessType = (
  album: AlbumVO,
  accessType: ACCESS_TYPE
): ImageVO[] => {
  let albumImages: ImageVO[] = ramda.clone(album.images);

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

export const filterImagesForFavorites = (
  favoriteImageIds: string[],
  albumImages: ImageVO[]
): ImageVO[] => {
  const favoriteImages: ImageVO[] = [];

  favoriteImageIds.map((favId) => {
    albumImages.find((image) => {
      if (image.id === favId) {
        favoriteImages.push(image);
      }
    });
  });

  return favoriteImages;
};
