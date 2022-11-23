import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DoneIcon from '@mui/icons-material/Done';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import { useMediaQuery } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Fade from '@mui/material/Fade';
import ImageListItem from '@mui/material/ImageListItem';
import { blue } from '@mui/material/colors';
import { useTheme } from '@mui/material/styles';
import { makeStyles, createStyles } from '@mui/styles';
import clsx from 'clsx';
import React, { useState } from 'react';

import { ImageVO } from '../../../../../configs/interfaces';
import SkeletonImage from './SkeletonImage';
import BottomFavToolbar from './toolbars/BottomFavToolbar';
import BottomFullToolbar from './toolbars/BottomFullToolbar';

const useStyles = makeStyles(() =>
  createStyles({
    imageListItem: {
      width: '100%',
      border: '1px solid black',
      '&:hover': {
        cursor: 'pointer',
      },
    },
    multiSelectModeImage: {
      backgroundColor: '#121212',
      backgroundImage:
        'linear-gradient(rgba(255, 255, 255, 0.09), rgba(255, 255, 255, 0.09))',
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

export default function Image(props: MasonryListImageProps): JSX.Element {
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
  } = props;

  const [hoveringOverImageId, setHoveringOverImageId] = useState('');
  const [hoveringOverUncheckedIcon, setHoveringOverUncheckedIcon] =
    useState('');
  const [imageLoaded, setImageLoaded] = useState(false);

  const updateAndClear = () => {
    toggleImageFromMultiSelectHandler(image.id);
    setHoveringOverUncheckedIcon('');
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
        <div style={{ position: 'absolute' }}>
          {imageIsInMultiSelectList ? (
            <Avatar
              sx={{
                height: '24px',
                width: '24px',
                ml: 1,
                mt: 1,
                bgcolor: blue[500],
              }}
            >
              <DoneIcon
                onClick={(e) => {
                  e.stopPropagation();
                  toggleImageFromMultiSelectHandler(image.id);
                  setHoveringOverUncheckedIcon('');
                }}
              />
            </Avatar>
          ) : hoveringOverUncheckedIcon ? (
            <CheckCircleIcon
              sx={{ ml: 1, mt: 1 }}
              onMouseLeave={() => {
                setHoveringOverUncheckedIcon('');
              }}
              onClick={(e) => {
                e.stopPropagation();
                setIsInMultiSelectModeClickHandler();
                toggleImageFromMultiSelectHandler(image.id);
              }}
            />
          ) : (
            <RadioButtonUncheckedIcon
              sx={{ ml: 1, mt: 1 }}
              onMouseOver={() => {
                setHoveringOverUncheckedIcon(image.id);
              }}
              onMouseLeave={() => {
                setHoveringOverUncheckedIcon('');
              }}
            />
          )}
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
}

interface MasonryListImageProps {
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
