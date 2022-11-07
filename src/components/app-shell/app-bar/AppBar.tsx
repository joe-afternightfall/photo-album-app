import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { makeStyles, createStyles } from '@mui/styles';
import React from 'react';

const useStyles = makeStyles(() => createStyles({}));

export default function TopAppBar(props: TopAppBarProps): JSX.Element {
  const classes = useStyles();

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
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Grid container spacing={3}>
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
            </Grid>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}

interface TopAppBarProps {
  DELETE_ME?: string;
}
