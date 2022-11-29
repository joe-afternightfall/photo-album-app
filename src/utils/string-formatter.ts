import { AlbumVO } from '../configs/interfaces';

export const getUserInitials = (username: string): string => {
  const stringArray = username.split(' ');

  if (stringArray.length === 1) {
    return stringArray[0].substring(0, 1).toUpperCase();
  } else if (stringArray.length > 1) {
    const firstLetter = stringArray[0].substring(0, 1).toUpperCase();
    const secondLetter = stringArray[1].substring(0, 1).toUpperCase();
    return firstLetter + secondLetter;
  }
  return '';
};

export const getNumberOfFavorites = (
  album: AlbumVO,
  favs: string[]
): number => {
  let numberOfFavorites = 0;
  album.images.map((image) => {
    if (favs.indexOf(image.id) !== -1) {
      numberOfFavorites += 1;
    }
  });
  return numberOfFavorites;
};
