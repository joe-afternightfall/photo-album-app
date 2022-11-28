import Box from '@mui/material/Box';
import React, { useState } from 'react';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';

import { ImageVO } from '../../../../configs/interfaces';
import ListViewLightbox from './lightbox/ListViewLightbox';
import ListViewImageItem from './masonry-image/ListViewImageItem';

export default function ListView(props: Props): JSX.Element {
  const { images } = props;
  const defaultDisplay = {
    open: false,
    downloadURL: '',
    index: -1,
  };

  const [displayLightbox, setDisplayLightbox] = useState(defaultDisplay);

  return (
    <Box sx={{ pt: 3 }}>
      <ResponsiveMasonry>
        <Masonry>
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
        </Masonry>
      </ResponsiveMasonry>

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
