import Box from '@mui/material/Box';
import { Theme } from '@mui/material/styles';
import { makeStyles, createStyles } from '@mui/styles';
import React from 'react';

import AppDialogs from './AppDialogs';
import TopAppBar from './components/app-shell/app-bar/AppBar';
import AppLoader from './components/app-shell/app-loader/AppLoader';
import AppSnackbar from './components/app-shell/app-snackbar/AppSnackbar';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      // display: 'flex',
      transition: theme.transitions.easing.easeIn,
      [theme.breakpoints.down('sm')]: {
        paddingLeft: '8px',
        paddingRight: '8px',
      },
      [theme.breakpoints.up('sm')]: {
        paddingLeft: '16px',
        paddingRight: '16px',
      },
      [theme.breakpoints.up('lg')]: {
        paddingLeft: '24px',
        paddingRight: '24px',
      },
    },
    headerMixin: {
      ...theme.mixins.toolbar,
    },
  })
);

function App(props: AppProps) {
  const { children } = props;
  const classes = useStyles();
  return (
    <Box className={classes.root} data-testid="app-shell-wrapper">
      <main data-testid="app-main-wrapper">
        <div data-testid="app-header-mixin" className={classes.headerMixin} />
        <AppDialogs />
        <TopAppBar />
        <AppSnackbar />
        <AppLoader />
        <div>{children}</div>
      </main>
    </Box>
  );
}

interface AppProps {
  children: JSX.Element;
}

export default App;
