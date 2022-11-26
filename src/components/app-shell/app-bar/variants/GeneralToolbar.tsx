import MenuIcon from '@mui/icons-material/Menu';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import React from 'react';

import UserProfile from '../components/user-profile/UserProfile';

export default function GeneralToolbar(): JSX.Element {
  return (
    <Toolbar>
      <IconButton
        color="inherit"
        edge="start"
        sx={{
          mr: 2,
        }}
        onClick={() => {
          console.log('hamburger clicked');
        }}
      >
        <MenuIcon />
      </IconButton>
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
