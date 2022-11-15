import { useMediaQuery } from '@mui/material';
import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import { useTheme } from '@mui/material/styles';
import React, { useState } from 'react';

import { ImageVO } from '../../../../configs/interfaces';
import SelectedImageDialog from './components/SelectedImageDialog';
import Image from './components/masonry-list/Image';

export default function ListView(props: ListViewProps): JSX.Element {
  const theme = useTheme();
  const { images } = props;
  const isXs = useMediaQuery(theme.breakpoints.down(700));

  const [displayFullImage, setDisplayFullImage] = useState({
    open: false,
    downloadURL: '',
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

      <SelectedImageDialog
        open={displayFullImage.open}
        downloadURL={displayFullImage.downloadURL}
        closeHandler={() => {
          setDisplayFullImage({
            open: false,
            downloadURL: '',
          });
        }}
      />
    </Box>
  );
}

interface ListViewProps {
  images: ImageVO[];
}
