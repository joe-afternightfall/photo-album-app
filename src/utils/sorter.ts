import { ImageVO } from '../configs/interfaces';

export const sortImagesByName = (images: ImageVO[]): ImageVO[] => {
  images.sort((a, b) => {
    const aFileName = a.fileName.split('.');
    const bFileName = b.fileName.split('.');
    return Number(aFileName[0]) - Number(bFileName[0]);
  });

  return images;
};
