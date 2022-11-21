import StarBorderIcon from '@mui/icons-material/StarBorderRounded';
import StarIcon from '@mui/icons-material/StarRounded';
import Grid from '@mui/material/Grid';
import { makeStyles, createStyles } from '@mui/styles';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import Lightbox from 'yet-another-react-lightbox';
import Fullscreen from 'yet-another-react-lightbox/plugins/fullscreen';
import Slideshow from 'yet-another-react-lightbox/plugins/slideshow';
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails';

import { ImageVO } from '../../../../../configs/interfaces';
import { State } from '../../../../../configs/redux/store';
import { ApplicationActions } from '../../../../../creators/actions';
import {
  removeImageFromUsersFavoriteList,
  tagImageAsFavorite,
} from '../../../../../firebase/services/firebase-users-service';

import 'yet-another-react-lightbox/plugins/thumbnails.css';
import 'yet-another-react-lightbox/styles.css';

const useStyles = makeStyles(() =>
  createStyles({
    star: {
      height: '100%',
      width: '32px',
      color: 'rgba(255, 255, 255, 0.8)',
      '&:hover': {
        cursor: 'pointer',
        color: 'rgba(255, 255, 255)',
      },
    },
  })
);

const getCurrentImageId = (): string | null | undefined => {
  const foundCurrentSlide = document.getElementsByClassName(
    'yarl__slide_current'
  );
  if (foundCurrentSlide.length) {
    return foundCurrentSlide[0].firstElementChild?.getAttribute('alt');
  }
};

const ListViewLightbox = (props: ListViewLightboxProps): JSX.Element => {
  const classes = useStyles();
  const {
    open,
    images,
    closeHandler,
    selectedIndex,
    favoriteImageIds,
    toggleFavHandler,
  } = props;

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

  const handleClick = () => {
    toggleFavHandler(isFav, currentImageId);
  };

  useEffect(() => {
    checkForFavoriteImage();
  }, [favoriteImageIds]);

  const iconButton = (
    <Grid
      container
      alignItems="center"
      direction="column"
      justifyContent="center"
    >
      <Grid item sx={{ px: 1 }}>
        {isFav ? (
          <StarIcon
            fontSize="medium"
            onClick={handleClick}
            className={classes.star}
          />
        ) : (
          <StarBorderIcon
            fontSize="medium"
            onClick={handleClick}
            className={classes.star}
          />
        )}
      </Grid>
    </Grid>
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

type ListViewLightboxProps = PassedInProps & StateProps & DispatchProps;

interface PassedInProps {
  open: boolean;
  closeHandler: () => void;
  selectedIndex: number;
  images: ImageVO[];
}

interface StateProps {
  favoriteImageIds: string[];
}

interface DispatchProps {
  toggleFavHandler: (isFav: boolean, imageId: string) => void;
}

const mapStateToProps = (state: State): StateProps => {
  const signedInUser = state.applicationState.signedInUser;
  return {
    favoriteImageIds: signedInUser ? signedInUser.favoriteImageIds : [],
  };
};

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  toggleFavHandler: (isFav: boolean, imageId: string) => {
    (dispatch as ThunkDispatch<State, void, ApplicationActions>)(
      isFav
        ? removeImageFromUsersFavoriteList(imageId)
        : tagImageAsFavorite(imageId)
    );
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ListViewLightbox);
