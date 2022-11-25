import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Skeleton from '@mui/material/Skeleton';
import React from 'react';

const getRandomHeight = (n: number): string => {
  const heights: string[] = ['164px', '118px', '200px', '132px', '178px'];
  let builtHeight = '156px';
  for (let x = 0; x < n; x++) {
    if ((x + 1) % 6 === 0) {
      builtHeight = heights[4];
    } else if ((x + 1) % 5 === 0) {
      builtHeight = heights[2];
    } else if ((x + 1) % 3 === 0) {
      builtHeight = heights[1];
    } else if ((x + 1) % 4 === 0) {
      builtHeight = heights[3];
    } else if ((x + 1) % 2 === 0) {
      builtHeight = heights[0];
    } else {
      builtHeight = heights[2];
    }
  }
  return builtHeight;
};

export default function SkeletonImage(props: Props): JSX.Element {
  const { index } = props;

  return (
    <Card
      sx={{ width: '100%', pb: 1, objectFit: 'contain', overflow: 'hidden' }}
    >
      <Grid container>
        <Grid item xs={12}>
          <Skeleton
            variant="rectangular"
            width={'100%'}
            height={getRandomHeight(index)}
            animation={false}
          />
        </Grid>
        <Grid
          item
          xs={12}
          container
          sx={{ mt: 1, px: 1 }}
          justifyContent="space-between"
        >
          <Grid item xs={8}>
            <Skeleton variant="rectangular" width="100%" height={10} />
          </Grid>
          <Grid
            item
            xs={3}
            container
            spacing={1}
            justifyContent="flex-end"
            // sx={{ px: '4px' }}
          >
            <Grid item xs={4}>
              <Skeleton variant="rectangular" width="100%" height={10} />
            </Grid>
            <Grid item xs={4}>
              <Skeleton variant="rectangular" width="100%" height={10} />
            </Grid>
            <Grid item xs={4}>
              <Skeleton variant="rectangular" width="100%" height={10} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Card>
  );
}

interface Props {
  index: number;
}
