import StarIcon from '@mui/icons-material/StarRounded';
import { useMediaQuery } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import ImageList from '@mui/material/ImageList';
import { useTheme } from '@mui/material/styles';
import React, { useState } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import Fullscreen from 'yet-another-react-lightbox/plugins/fullscreen';
import Slideshow from 'yet-another-react-lightbox/plugins/slideshow';
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails';

import { ImageVO } from '../../../../configs/interfaces';
import Image from './masonry-image/Image';

import 'yet-another-react-lightbox/plugins/thumbnails.css';
import 'yet-another-react-lightbox/styles.css';

export default function ListView(props: ListViewProps): JSX.Element {
  const theme = useTheme();
  const { images } = props;
  const isXs = useMediaQuery(theme.breakpoints.down(700));

  const [displayFullImage, setDisplayFullImage] = useState({
    open: false,
    downloadURL: '',
    index: -1,
  });

  const iconButton = (
    <Grid
      container
      alignItems="center"
      direction="column"
      justifyContent="center"
    >
      <Grid item sx={{ px: 1 }}>
        <StarIcon
          fontSize="medium"
          onClick={() => {
            console.log('star clicked');
          }}
          sx={{
            height: '100%',
            width: '32px',
            color: 'rgba(255, 255, 255, 0.8)',
          }}
        />
      </Grid>
    </Grid>
  );

  return (
    <Box>
      <ImageList variant="masonry" cols={isXs ? 2 : 4} gap={8}>
        {images.map((image, index) => {
          return (
            <Image
              index={index}
              key={image.id}
              image={image}
              clickHandler={setDisplayFullImage}
            />
          );
        })}
      </ImageList>

      <Lightbox
        toolbar={{ buttons: [iconButton, 'close'] }}
        open={displayFullImage.open}
        close={() => {
          setDisplayFullImage({
            open: false,
            downloadURL: '',
            index: -1,
          });
        }}
        index={displayFullImage.index}
        slides={images.map((image) => {
          return {
            src: image.downloadURL,
            alt: image.id,
          };
        })}
        plugins={[Fullscreen, Slideshow, Thumbnails]}
        on={{
          view: () => {
            const foundCurrentSlide = document.getElementsByClassName(
              'yarl__slide_current'
            );
            if (foundCurrentSlide) {
              console.log(
                'foundCurrentSlide length: ' +
                  JSON.stringify(foundCurrentSlide.length)
              );
              const srcAttribute =
                foundCurrentSlide[0].firstElementChild?.getAttribute('src');
              const altAttribute =
                foundCurrentSlide[0].firstElementChild?.getAttribute('alt');
              console.log(
                '******** srcAttribute: ' + JSON.stringify(srcAttribute)
              );
              console.log(
                '!!!!!! VIEW_TRIGGERED: ' + JSON.stringify(altAttribute)
              );
              // todo: check for favorite image ID here
            }
          },
        }}
      />
    </Box>
  );
}

interface ListViewProps {
  images: ImageVO[];
}
