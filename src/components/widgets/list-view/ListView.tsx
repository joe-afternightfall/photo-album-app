import { useMediaQuery } from '@mui/material';
import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { useTheme } from '@mui/material/styles';
import { createStyles, makeStyles } from '@mui/styles';
import React, { useState } from 'react';

import { ImageVO } from '../../../configs/interfaces';
import ImageToolbar from './components/ImageToolbar';

const useStyles = makeStyles(() =>
  createStyles({
    imageListItem: {
      border: '1px solid black',
      '&:hover': {
        cursor: 'pointer',
      },
    },
  })
);

export default function ListView(props: ListViewProps): JSX.Element {
  const classes = useStyles();
  const theme = useTheme();
  const { images } = props;
  const isXs = useMediaQuery(theme.breakpoints.down(700));
  const isMd = useMediaQuery(theme.breakpoints.up('md'));
  const [displayToolBar, setDisplayToolbar] = useState('');

  return (
    <Box>
      <ImageList variant="masonry" cols={isXs ? 2 : 4} gap={8}>
        {images.map((image) => {
          return (
            <ImageListItem
              onMouseOver={() => {
                setDisplayToolbar(image.id);
              }}
              onMouseLeave={() => {
                setDisplayToolbar('');
              }}
              key={image.id}
              className={classes.imageListItem}
            >
              <img
                src={image.downloadURL}
                alt={image.fileName}
                loading="lazy"
                style={{
                  objectFit: 'contain',
                }}
              />

              {isMd ? (
                <Fade in={displayToolBar === image.id}>
                  <div>
                    <ImageToolbar imageId={image.id} />
                  </div>
                </Fade>
              ) : (
                <ImageToolbar imageId={image.id} />
              )}
            </ImageListItem>
          );
        })}
      </ImageList>
    </Box>
  );
}

interface ListViewProps {
  images: ImageVO[];
}
