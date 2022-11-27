import Grid from '@mui/material/Grid';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import React from 'react';

import AppSideDrawer from '../../app-side-drawer/AppSideDrawer';
import UserProfile from '../components/user-profile/UserProfile';

export default function GeneralToolbar(): JSX.Element {
  return (
    <Toolbar>
      <AppSideDrawer />
      <Grid
        item
        xs={12}
        container
        alignItems="center"
        justifyContent="space-between"
      >
        <Grid item>
          <Typography
            variant="h6"
            noWrap
            component="div"
            data-testid="app-bar-title"
          >
            {`Yarbrough Photo Album's App`}
          </Typography>
        </Grid>
        <Grid item>
          <Grid container alignItems="center">
            <Grid item>
              <UserProfile />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Toolbar>
  );
}
