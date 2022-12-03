import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import * as ramda from 'ramda';
import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';

import { ImageVO } from '../../../../configs/interfaces';
import { ACCESS_TYPE } from '../../../../configs/interfaces/image/ImageDAO';
import ListViewLightbox from './lightbox/ListViewLightbox';
import ListViewImageItem from './masonry-image/ListViewImageItem';

const getImages = (images: ImageVO[]): ImageVO[] => {
  if (images.length >= 10) {
    return images.slice(0, 10);
  }
  return images;
};

export default function ListView(props: Props): JSX.Element {
  const { images, userIsAdmin } = props;
  const defaultDisplay = {
    open: false,
    downloadURL: '',
    index: -1,
  };

  const [hasMore, setHasMore] = useState(true);
  const [displayLightbox, setDisplayLightbox] = useState(defaultDisplay);
  const [localImages, setLocalImages] = useState<ImageVO[]>(getImages(images));

  const fetchMoreData = () => {
    const clonedImages = ramda.clone(images);
    const clonedLocalImages = ramda.clone(localImages);
    const startIndex = localImages.length;

    for (let i = startIndex; i < startIndex + 5; ++i) {
      const imageVO = clonedImages[i];
      imageVO && clonedLocalImages.push(imageVO);
    }

    setHasMore(!(clonedLocalImages.length === images.length));
    setLocalImages(clonedLocalImages);
  };

  useEffect(() => {
    setLocalImages(images);
  }, [images]);

  return (
    <Box sx={{ pt: 3 }}>
      <InfiniteScroll
        dataLength={localImages.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={
          <Grid container justifyContent="center">
            <Grid item>
              <Typography>{'Loading...'}</Typography>
            </Grid>
          </Grid>
        }
        endMessage={
          <p style={{ textAlign: 'center' }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        <ResponsiveMasonry>
          <Masonry gutter="12px">
            {localImages.map((image, index) => {
              if (image.accessType === ACCESS_TYPE.PRIVATE && !userIsAdmin) {
                return null;
              }
              return (
                <ListViewImageItem
                  key={image.id}
                  image={image}
                  openLightboxHandler={() => {
                    setDisplayLightbox({
                      open: true,
                      downloadURL: image.compressedDownloadURL,
                      index: index,
                    });
                  }}
                />
              );
            })}
          </Masonry>
        </ResponsiveMasonry>
      </InfiniteScroll>

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
  userIsAdmin: boolean;
}
