import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import React from 'react';

import { auth } from '../../../configs/firebase/firebase-config';

export default function TopAppBar(): JSX.Element {
  const signOut = async () => {
    window.location.replace('/');
    await auth.signOut();
  };

  return (
    <AppBar position="fixed" data-testid="top-app-bar">
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={() => {
            console.log('hamburger clicked');
          }}
          edge="start"
          sx={{
            mr: 2,
          }}
          data-testid="hamburger-toggle"
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
              {'Album App'}
            </Typography>
          </Grid>
          <Grid item>
            <IconButton onClick={signOut}>
              <LogoutIcon />
            </IconButton>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}
