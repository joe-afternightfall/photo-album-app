import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Lightbox from 'yet-another-react-lightbox';
import Fullscreen from 'yet-another-react-lightbox/plugins/fullscreen';
import Slideshow from 'yet-another-react-lightbox/plugins/slideshow';
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails';

import { ImageVO } from '../../../../../configs/interfaces';
import { State } from '../../../../../configs/redux/store';
import LightboxFavButton from './LightboxFavButton';

import 'yet-another-react-lightbox/plugins/thumbnails.css';
import 'yet-another-react-lightbox/styles.css';

const getCurrentImageId = (): string | null | undefined => {
  const foundCurrentSlide = document.getElementsByClassName(
    'yarl__slide_current'
  );
  if (foundCurrentSlide.length) {
    return foundCurrentSlide[0].firstElementChild?.getAttribute('alt');
  }
};

const ListViewLightbox = (props: ListViewLightboxProps): JSX.Element => {
  const { open, images, closeHandler, selectedIndex, favoriteImageIds } = props;

  const [isFav, setIsFav] = useState(false);
  const [currentImageId, setCurrentImageId] = useState('');

  const checkForFavoriteImage = () => {
    const imageId = getCurrentImageId();
    if (imageId) {
      const foundIndex = favoriteImageIds.indexOf(imageId);
      setIsFav(foundIndex !== -1);
      setCurrentImageId(imageId);
    }
  };

  useEffect(() => {
    checkForFavoriteImage();
  }, [favoriteImageIds]);

  const iconButton = (
    <LightboxFavButton isFav={isFav} currentImageId={currentImageId} />
  );

  return (
    <Lightbox
      toolbar={{ buttons: [iconButton, 'close'] }}
      open={open}
      close={closeHandler}
      index={selectedIndex}
      slides={images.map((image) => {
        return {
          src: image.downloadURL,
          alt: image.id,
        };
      })}
      plugins={[Fullscreen, Slideshow, Thumbnails]}
      on={{
        view: () => checkForFavoriteImage(),
        entered: () => checkForFavoriteImage(),
      }}
    />
  );
};

type ListViewLightboxProps = PassedInProps & StateProps;

interface PassedInProps {
  open: boolean;
  closeHandler: () => void;
  selectedIndex: number;
  images: ImageVO[];
}

interface StateProps {
  favoriteImageIds: string[];
}

const mapStateToProps = (state: State): StateProps => {
  const signedInUser = state.applicationState.signedInUser;
  return {
    favoriteImageIds: signedInUser ? signedInUser.favoriteImageIds : [],
  };
};

export default connect(mapStateToProps)(ListViewLightbox);
