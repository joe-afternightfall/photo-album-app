import { useMediaQuery } from '@mui/material';
import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import { useTheme } from '@mui/material/styles';
import React, { useState } from 'react';

import { ImageVO } from '../../../../configs/interfaces';
import ListViewLightbox from './lightbox/ListViewLightbox';
import Image from './masonry-image/Image';

export default function ListView(props: ListViewProps): JSX.Element {
  const theme = useTheme();
  const { images } = props;
  const isXs = useMediaQuery(theme.breakpoints.down(700));

  const [displayFullImage, setDisplayFullImage] = useState({
    open: false,
    downloadURL: '',
    index: -1,
  });
  const [isInMultiSelectMode, setIsInMultiSelectMode] = useState(false);
  const [imagesSelectedForMulti, setImagesSelectedForMulti] = useState<
    string[]
  >([]);

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
              isInMultiSelectMode={isInMultiSelectMode}
              setIsInMultiSelectModeClickHandler={() => {
                setIsInMultiSelectMode(true);
              }}
            />
          );
        })}
      </ImageList>

      <ListViewLightbox
        open={displayFullImage.open}
        images={images}
        selectedIndex={displayFullImage.index}
        closeHandler={() => {
          setDisplayFullImage({
            open: false,
            downloadURL: '',
            index: -1,
          });
        }}
      />
    </Box>
  );
}

interface ListViewProps {
  images: ImageVO[];
}
