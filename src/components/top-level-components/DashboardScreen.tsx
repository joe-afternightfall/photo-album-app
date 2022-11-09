import Grid from '@mui/material/Grid';
import React from 'react';

import NewAlbumDialog from '../widgets/dialogs/new-album-dialog/NewAlbumDialog';
import AllAlbumsView from '../widgets/views/all-albums-view/AllAlbumsView';

export default function DashboardScreen(): JSX.Element {
  return (
    <Grid container item xs={12} spacing={2}>
      <Grid item xs={12} container justifyContent="flex-end">
        <NewAlbumDialog />
      </Grid>
      <Grid item xs={12}>
        <AllAlbumsView />
      </Grid>
    </Grid>
  );
}
