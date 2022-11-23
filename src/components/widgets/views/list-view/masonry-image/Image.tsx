import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import { useMediaQuery } from '@mui/material';
import Fade from '@mui/material/Fade';
import ImageListItem from '@mui/material/ImageListItem';
import { useTheme } from '@mui/material/styles';
import { makeStyles, createStyles } from '@mui/styles';
import React, { useState } from 'react';

import { ImageVO } from '../../../../../configs/interfaces';
import SkeletonImage from './SkeletonImage';
import ImageToolbar from './toolbar/ImageToolbar';

const useStyles = makeStyles(() =>
  createStyles({
    imageListItem: {
      width: '100%',
      border: '1px solid black',
      '&:hover': {
        cursor: 'pointer',
      },
    },
  })
);

export default function Image(props: MasonryListImageProps): JSX.Element {
  const classes = useStyles();
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'));
  const {
    image,
    clickHandler,
    index,
    isInMultiSelectMode,
    setIsInMultiSelectModeClickHandler,
  } = props;

  const [hoveringOverImageId, setHoveringOverImageId] = useState('');
  const [hoveringOverUncheckedIcon, setHoveringOverUncheckedIcon] =
    useState('');
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <ImageListItem
      onMouseOver={() => {
        setHoveringOverImageId(image.id);
      }}
      onMouseLeave={() => {
        setHoveringOverImageId('');
      }}
      key={image.id}
      className={classes.imageListItem}
      onClick={() => {
        clickHandler({
          open: true,
          downloadURL: image.downloadURL,
          index: index,
        });
      }}
    >
      {/* todo: handle when in mobile/tablet */}
      <Fade in={hoveringOverImageId === image.id || isInMultiSelectMode}>
        <div style={{ position: 'absolute' }}>
          {hoveringOverUncheckedIcon ? (
            <CheckCircleIcon
              sx={{ ml: 1, mt: 1 }}
              onMouseLeave={() => {
                setHoveringOverUncheckedIcon('');
              }}
              onClick={(e) => {
                e.stopPropagation();
                setIsInMultiSelectModeClickHandler();
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
          objectFit: 'contain',
          overflow: 'hidden',
          display: imageLoaded ? 'block' : 'none',
        }}
      />

      {!imageLoaded && <SkeletonImage index={index} />}
      {isMd ? (
        <Fade in={hoveringOverImageId === image.id}>
          <div>
            <ImageToolbar image={image} />
          </div>
        </Fade>
      ) : (
        <ImageToolbar image={image} />
      )}
    </ImageListItem>
  );
}

interface MasonryListImageProps {
  index: number;
  image: ImageVO;
  isInMultiSelectMode: boolean;
  setIsInMultiSelectModeClickHandler: () => void;
  clickHandler: (props: {
    open: boolean;
    downloadURL: string;
    index: number;
  }) => void;
}
