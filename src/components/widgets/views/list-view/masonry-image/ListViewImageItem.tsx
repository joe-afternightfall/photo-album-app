import { useMediaQuery } from '@mui/material';
import Fade from '@mui/material/Fade';
import ImageListItem from '@mui/material/ImageListItem';
import { useTheme } from '@mui/material/styles';
import { makeStyles, createStyles } from '@mui/styles';
import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { ImageVO } from '../../../../../configs/interfaces';
import { State } from '../../../../../configs/redux/store';
import {
  updateHoveringOverIconId,
  updateMultiSelectIds,
} from '../../../../../creators/selected-album/multi-select-mode';
import SkeletonImage from './SkeletonImage';
import Image from './image/Image';
import BottomFavToolbar from './toolbars/BottomFavToolbar';
import BottomFullToolbar from './toolbars/BottomFullToolbar';
import TopToolbar from './toolbars/TopToolbar';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      width: '100%',
      position: 'relative',
    },
    pointer: { cursor: 'pointer' },
    multiSelectModeImage: {
      backgroundColor: '#121212',
      transition: 'box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
      boxShadow:
        '0px 6px 6px -3px rgb(0 0 0 / 20%), 0px 10px 14px 1px rgb(0 0 0 / 14%), 0px 4px 18px 3px rgb(0 0 0 / 12%)',
      backgroundImage:
        'linear-gradient(rgba(255, 255, 255, 0.13), rgba(255, 255, 255, 0.13))',
      zIndex: 1,
    },
  })
);

const ListViewImageItem = (props: Props): JSX.Element => {
  const classes = useStyles();
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'));
  const {
    image,
    isInMultiSelectMode,
    openLightboxHandler,
    toggleHandler,
    onHoverHandler,
  } = props;

  const [hoveringOverImageId, setHoveringOverImageId] = useState('');
  const [imageLoaded, setImageLoaded] = useState(false);
  const [displayImage, setDisplayImage] = useState(false);

  const updateAndClear = () => {
    toggleHandler(image.id);
    onHoverHandler('');
  };

  useEffect(() => {
    setTimeout(() => {
      setDisplayImage(true);
    }, 350);
  }, [imageLoaded]);

  return (
    <ImageListItem
      onMouseOver={() => {
        setHoveringOverImageId(image.id);
      }}
      onMouseLeave={() => {
        setHoveringOverImageId('');
      }}
      key={image.id}
      className={clsx(classes.root, {
        [classes.pointer]: displayImage,
        [classes.multiSelectModeImage]: isInMultiSelectMode,
      })}
      onClick={() => {
        isInMultiSelectMode ? updateAndClear() : openLightboxHandler();
      }}
    >
      {/* todo: handle when in mobile/tablet */}
      {displayImage && (
        <Fade in={hoveringOverImageId === image.id || isInMultiSelectMode}>
          <div>
            <TopToolbar imageId={image.id} />
          </div>
        </Fade>
      )}

      <Image
        image={image}
        displayImage={displayImage}
        onLoadHandler={() => {
          setImageLoaded(true);
        }}
      />

      <SkeletonImage displayImage={imageLoaded} />

      {displayImage ? (
        isInMultiSelectMode ? null : isMd ? (
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
        )
      ) : null}
    </ImageListItem>
  );
};

type Props = PassedInProps & StateProps & DispatchProps;

interface PassedInProps {
  image: ImageVO;
  openLightboxHandler: () => void;
}

interface StateProps {
  isInMultiSelectMode: boolean;
}

const mapStateToProps = (state: State): StateProps => {
  return {
    isInMultiSelectMode: state.selectedAlbumState.isInMultiSelectMode,
  };
};

interface DispatchProps {
  onHoverHandler: (iconId: string) => void;
  toggleHandler: (imageId: string) => void;
}

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  onHoverHandler: (iconId: string) => {
    dispatch(updateHoveringOverIconId(iconId));
  },
  toggleHandler: (imageId: string) => {
    dispatch(updateMultiSelectIds(imageId));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ListViewImageItem);
