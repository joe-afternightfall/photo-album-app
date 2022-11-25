import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Skeleton from '@mui/material/Skeleton';
import { createStyles, makeStyles } from '@mui/styles';
import React from 'react';

import SkeletonImageToolbar from '../../../../shared/skeleton/skeleton-image-toolbar/SkeletonImageToolbar';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      width: '100%',
      objectFit: 'contain',
      overflow: 'hidden',
      position: 'absolute',
      top: 0,
      height: '100%',
    },
  })
);

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
  const classes = useStyles();

  return (
    <Card sx={{ pb: 1 }} square className={classes.root}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          flexWrap: 'nowrap',
          justifyContent: 'flex-start',
          alignItems: 'stretch',
          alignContent: 'stretch',
          height: '100%',
        }}
      >
        <div
          style={{
            flex: '1 1 auto',
            display: 'flex',
          }}
        >
          <Skeleton
            variant="rectangular"
            width={'100%'}
            height={'100%'}
            animation={false}
          />
        </div>
        <div>
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
            <SkeletonImageToolbar />
          </Grid>
        </div>
      </div>
      <Grid container direction="column" justifyContent="space-between">
        <Grid item xs={12}>
          <Skeleton
            variant="rectangular"
            width={'100%'}
            height={'100%'}
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
          <SkeletonImageToolbar />
        </Grid>
      </Grid>
    </Card>
  );
}

interface Props {
  index: number;
}
