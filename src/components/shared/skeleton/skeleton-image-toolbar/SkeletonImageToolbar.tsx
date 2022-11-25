import Grid from '@mui/material/Grid';
import Skeleton from '@mui/material/Skeleton';
import React from 'react';

export default function SkeletonImageToolbar(): JSX.Element {
  return (
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
      <Grid item xs={3} container spacing={1} justifyContent="flex-end">
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
  );
}
