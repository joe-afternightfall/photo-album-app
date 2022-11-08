import { useMediaQuery } from '@mui/material';
import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { useTheme } from '@mui/material/styles';
import React from 'react';

export default function ListView(): JSX.Element {
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down(700));
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
  return (
    // <Box sx={{ width: 500, height: 450, overflowY: 'scroll' }}>
    <Box>
      <ImageList variant="masonry" cols={isXs ? 2 : 4} gap={8}>
        {images.map((item) => (
          <ImageListItem key={item}>
            <img
              src={item}
              // srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
              alt={item}
              loading="lazy"
            />
          </ImageListItem>
        ))}
      </ImageList>
    </Box>
  );
}

interface ListViewProps {
  DELETE_ME?: string;
}
