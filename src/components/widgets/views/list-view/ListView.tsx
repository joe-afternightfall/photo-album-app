import { useMediaQuery } from '@mui/material';
import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import { useTheme } from '@mui/material/styles';
import * as ramda from 'ramda';
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

  const toggleImageFromMultiSelect = (imageId: string) => {
    const clonedList = ramda.clone(imagesSelectedForMulti);
    const imageIndex = clonedList.indexOf(imageId);
    if (imageIndex === -1) {
      clonedList.push(imageId);
      setImagesSelectedForMulti(clonedList);
    } else {
      const newList = clonedList.filter((id) => id !== imageId);
      if (newList.length === 0) {
        setIsInMultiSelectMode(false);
      }
      setImagesSelectedForMulti(newList);
    }
  };

  return (
    <Box>
      <ImageList variant="masonry" cols={isXs ? 2 : 4} gap={8}>
        {images.map((image, index) => {
          const isIn = imagesSelectedForMulti.indexOf(image.id) !== -1;
          return (
            <Image
              index={index}
              key={image.id}
              image={image}
              displayFullImageHandler={setDisplayFullImage}
              isInMultiSelectMode={isInMultiSelectMode}
              setIsInMultiSelectModeClickHandler={() => {
                setIsInMultiSelectMode(true);
              }}
              toggleImageFromMultiSelectHandler={toggleImageFromMultiSelect}
              imageIsInMultiSelectList={isIn}
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
