import { Card, CardContent, CardHeader } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { makeStyles, createStyles } from '@mui/styles';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import { Options } from '@splidejs/splide';
import clsx from 'clsx';
import React, { useEffect, useRef, useState } from 'react';
// Default theme
// import '@splidejs/react-splide/css';
import '@splidejs/react-splide/css/sea-green';
// import '@splidejs/react-splide/css/skyblue';

// or only core styles
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

  const images = [
    '0001.JPG',
    '0002.JPG',
    '0003.JPG',
    '0004.JPG',
    '0005.JPG',
    '0006.JPG',
    '0007.JPG',
    '0008.JPG',
    '0009.JPG',
    '0010.JPG',
  ];

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
              <SplideSlide key={image}>
                <img src={image} alt="Image 1" style={{ height: '100%' }} />
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
                key={image}
                onClick={() => {
                  handleThumbs(index);
                }}
              >
                <img
                  src={image}
                  alt={image}
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
  DELETE_ME?: string;
}
