import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Grid from '@mui/material/Grid';
import { makeStyles, createStyles } from '@mui/styles';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import { Options } from '@splidejs/splide';
import clsx from 'clsx';
import React, { useEffect, useRef, useState } from 'react';

import { ImageVO } from '../../../configs/interfaces';

import '@splidejs/react-splide/css/sea-green';
import '@splidejs/react-splide/css/core';

const useStyles = makeStyles(() =>
  createStyles({
    thumbnail: {
      // opacity: 0.3,
      '&:hover': {
        cursor: 'pointer',
      },
    },
    active: {
      opacity: 1,
    },
  })
);

export default function Gallery(props: GalleryProps): JSX.Element {
  const classes = useStyles();
  const { images } = props;

  const mainOptions: Options = {
    type: 'fade',
    rewind: true,
    pagination: false,
    arrows: true,
    height: '50vh',
    width: '100%',
    // perPage: 2,
    // perMove: 1,
    // gap: '1rem',
    // height: '40rem',
    // isNavigation: true,
  };

  const thumbsOptions: Options = {
    type: 'slide',
    // rewind: true,
    gap: '1rem',
    pagination: false,
    fixedWidth: 128,
    fixedHeight: 84,
    cover: true,
    focus: 'center',
    isNavigation: true,
  };

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const mainRef = useRef<Splide>(null);
  const thumbsRef = useRef<Splide>(null);

  useEffect(() => {
    if (mainRef.current && thumbsRef.current && thumbsRef.current.splide) {
      mainRef.current.sync(thumbsRef.current.splide);
    }
  }, [mainRef.current, selectedImageIndex]);
  const handleThumbs = (id: number) => {
    if (mainRef.current) {
      mainRef.current.go(id);
      setSelectedImageIndex(id);
    }
  };

  return (
    <Card sx={{ mt: 3, width: '95vw' }}>
      <CardHeader title="AlbumVO" />
      <CardContent sx={{ pt: 0 }}>
        <Grid container item xs={12}>
          <Splide
            aria-label="My Favorite Images"
            options={mainOptions}
            style={{ textAlign: 'center' }}
            ref={mainRef}
          >
            {images.map((image) => (
              <SplideSlide key={image.id}>
                <img
                  src={image.downloadURL}
                  alt="Image 1"
                  style={{ height: '100%' }}
                />
              </SplideSlide>
            ))}
          </Splide>
          <Splide
            aria-label="My Favorite Images"
            options={thumbsOptions}
            ref={thumbsRef}
            style={{ width: '100%' }}
          >
            {images.map((image, index) => (
              <SplideSlide
                key={image.id}
                onClick={() => {
                  handleThumbs(index);
                }}
              >
                <img
                  src={image.downloadURL}
                  alt={image.nickname}
                  className={clsx(classes.thumbnail, {
                    // [classes.active]: selectedImageIndex === index,
                  })}
                />
              </SplideSlide>
            ))}
          </Splide>
        </Grid>
      </CardContent>
    </Card>
  );
}

interface GalleryProps {
  images: ImageVO[];
}
