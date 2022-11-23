import { useMediaQuery } from '@mui/material';
import Fade from '@mui/material/Fade';
import ImageListItem from '@mui/material/ImageListItem';
import { useTheme } from '@mui/material/styles';
import { makeStyles, createStyles } from '@mui/styles';
import clsx from 'clsx';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { ImageVO } from '../../../../../configs/interfaces';
import { State } from '../../../../../configs/redux/store';
import { updateHoveringOverIconId } from '../../../../../creators/selected-album/multi-select-mode';
import SkeletonImage from './SkeletonImage';
import BottomFavToolbar from './toolbars/BottomFavToolbar';
import BottomFullToolbar from './toolbars/BottomFullToolbar';
import TopToolbar from './toolbars/TopToolbar';

const useStyles = makeStyles(() =>
  createStyles({
    // styles to use later
    innerWordWrapping: {
      opacity: 1,
      transition: 'opacity .2s .1s cubic-bezier(.4,0,1,1)',
      visibility: 'visible',
    },
    innerGroupWrapping: {
      opacity: 1,
      transition: 'opacity .2s .1s cubic-bezier(.4,0,1,1)',
      visibility: 'visible',
    },
    appbarWrapper: {
      boxShadow:
        '0 1px 2px 0 rgb(60 64 67 / 30%), 0 2px 6px 2px rgb(60 64 67 / 15%)',
      opacity: 1,
      transition: 'opacity .1s 0s cubic-bezier(.4,0,1,1)',
      visibility: 'visible',
    },
    toolbarWrapping: {
      opacity: 1,
      transition: 'opacity .2s .1s cubic-bezier(.4,0,1,1)',
      visibility: 'visible',
    },
    imageListItem: {
      width: '100%',
      border: '1px solid black',
      '&:hover': {
        cursor: 'pointer',
      },
    },
    multiSelectModeImage: {
      backgroundColor: '#121212',
      // backgroundImage:
      //   'linear-gradient(rgba(255, 255, 255, 0.09), rgba(255, 255, 255, 0.09))',

      transition: 'box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
      boxShadow:
        '0px 6px 6px -3px rgb(0 0 0 / 20%), 0px 10px 14px 1px rgb(0 0 0 / 14%), 0px 4px 18px 3px rgb(0 0 0 / 12%)',
      backgroundImage:
        'linear-gradient(rgba(255, 255, 255, 0.13), rgba(255, 255, 255, 0.13))',
      zIndex: 1,
      '&:hover': {
        cursor: 'pointer',
      },
    },
    selectedImage: {
      zIndex: -1,
      position: 'sticky',
      transform: 'translateZ(0px) scale3d(0.85, 0.88, 1)',
    },
    image: {
      objectFit: 'contain',
      overflow: 'hidden',
      transition: 'transform .135s cubic-bezier(0,0,.2,1)',
    },
  })
);

const Image = (props: Props): JSX.Element => {
  const classes = useStyles();
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'));
  const {
    image,
    index,
    isInMultiSelectMode,
    displayFullImageHandler,
    imageIsInMultiSelectList,
    setIsInMultiSelectModeClickHandler,
    toggleImageFromMultiSelectHandler,
    hoveringOverUncheckedIconId,
    onHoverHandler,
  } = props;

  const [hoveringOverImageId, setHoveringOverImageId] = useState('');
  const [imageLoaded, setImageLoaded] = useState(false);

  const updateAndClear = () => {
    toggleImageFromMultiSelectHandler(image.id);
    onHoverHandler('');
  };

  return (
    <ImageListItem
      onMouseOver={() => {
        setHoveringOverImageId(image.id);
      }}
      onMouseLeave={() => {
        setHoveringOverImageId('');
      }}
      key={image.id}
      className={
        isInMultiSelectMode
          ? classes.multiSelectModeImage
          : classes.imageListItem
      }
      onClick={() => {
        isInMultiSelectMode
          ? updateAndClear()
          : displayFullImageHandler({
              open: true,
              downloadURL: image.downloadURL,
              index: index,
            });
      }}
    >
      {/* todo: handle when in mobile/tablet */}
      <Fade in={hoveringOverImageId === image.id || isInMultiSelectMode}>
        <div>
          <TopToolbar
            imageId={image.id}
            imageIsInMultiSelectList={imageIsInMultiSelectList}
            hoveringOverUncheckedIconId={hoveringOverUncheckedIconId}
            toggleHandler={toggleImageFromMultiSelectHandler}
            onHoverHandler={onHoverHandler}
            setIsInMultiSelectModeClickHandler={
              setIsInMultiSelectModeClickHandler
            }
          />
        </div>
      </Fade>

      <img
        id={`image-item-${index}`}
        onLoad={() => {
          setImageLoaded(true);
        }}
        src={image.downloadURL}
        alt={image.fileName}
        loading="lazy"
        style={{
          display: imageLoaded ? 'block' : 'none',
        }}
        className={clsx(classes.image, {
          [classes.selectedImage]: imageIsInMultiSelectList,
        })}
      />

      {!imageLoaded && <SkeletonImage index={index} />}
      {isInMultiSelectMode ? null : isMd ? (
        hoveringOverImageId === image.id ? (
          <Fade in={hoveringOverImageId === image.id}>
            <div>
              <BottomFullToolbar image={image} />
            </div>
          </Fade>
        ) : (
          <BottomFavToolbar imageId={image.id} />
        )
      ) : (
        <BottomFullToolbar image={image} />
      )}
    </ImageListItem>
  );
};

type Props = PassedInProps & StateProps & DispatchProps;

interface PassedInProps {
  index: number;
  image: ImageVO;
  isInMultiSelectMode: boolean;
  setIsInMultiSelectModeClickHandler: () => void;
  imageIsInMultiSelectList: boolean;
  toggleImageFromMultiSelectHandler: (imageId: string) => void;
  displayFullImageHandler: (props: {
    open: boolean;
    downloadURL: string;
    index: number;
  }) => void;
}

interface StateProps {
  hoveringOverUncheckedIconId: string;
}

interface DispatchProps {
  onHoverHandler: (imageId: string) => void;
}

const mapStateToProps = (state: State): StateProps => {
  return {
    hoveringOverUncheckedIconId:
      state.selectedAlbumState.hoveringOverUncheckedIconId,
  };
};

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  onHoverHandler: (iconId: string) => {
    dispatch(updateHoveringOverIconId(iconId));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Image);
