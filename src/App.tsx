import Box from '@mui/material/Box';
import { Theme } from '@mui/material/styles';
import { makeStyles, createStyles } from '@mui/styles';
import React from 'react';

import TopAppBar from './components/app-shell/app-bar/AppBar';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      transition: theme.transitions.easing.easeIn,
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
        <TopAppBar />
        <div>{children}</div>
      </main>
    </Box>
  );
}

interface AppProps {
  children: JSX.Element;
}

export default App;
