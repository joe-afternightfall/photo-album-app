import { useMediaQuery } from '@mui/material';
import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import { useTheme } from '@mui/material/styles';
import React, { useState } from 'react';

import { ImageVO } from '../../../../configs/interfaces';
import ListViewLightbox from './lightbox/ListViewLightbox';
import ListViewImageItem from './masonry-image/ListViewImageItem';

export default function ListView(props: Props): JSX.Element {
  const theme = useTheme();
  const { images } = props;
  const isXs = useMediaQuery(theme.breakpoints.down(700));
  const defaultDisplay = {
    open: false,
    downloadURL: '',
    index: -1,
  };

  const [displayLightbox, setDisplayLightbox] = useState(defaultDisplay);

  return (
    <Box>
      <ImageList variant="masonry" cols={isXs ? 2 : 4} gap={8}>
        {images.map((image, index) => {
          return (
            <ListViewImageItem
              key={image.id}
              image={image}
              openLightboxHandler={() => {
                setDisplayLightbox({
                  open: true,
                  downloadURL: image.downloadURL,
                  index: index,
                });
              }}
            />
          );
        })}
      </ImageList>

      <ListViewLightbox
        open={displayLightbox.open}
        images={images}
        selectedIndex={displayLightbox.index}
        closeHandler={() => {
          setDisplayLightbox(defaultDisplay);
        }}
      />
    </Box>
  );
}

interface Props {
  images: ImageVO[];
}
