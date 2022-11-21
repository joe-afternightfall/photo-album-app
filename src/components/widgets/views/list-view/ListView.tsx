import { useMediaQuery } from '@mui/material';
import Box from '@mui/material/Box';
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
          };
        })}
        plugins={[Fullscreen, Slideshow, Thumbnails]}
      />
    </Box>
  );
}

interface ListViewProps {
  images: ImageVO[];
}
