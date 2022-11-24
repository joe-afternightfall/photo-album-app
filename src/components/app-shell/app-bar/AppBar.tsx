import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { makeStyles, createStyles } from '@mui/styles';
import { routerActions } from 'connected-react-router';
import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { AppPaths } from '../../../configs/app-settings/app-routes';
import { auth } from '../../../configs/firebase/firebase-config';
import { State } from '../../../configs/redux/store';
import ActionMenu from './ActionMenu';
import FavoritesToolbar from './variants/FavoritesToolbar';
import MultiSelectModeToolbar from './variants/MultiSelectModeToolbar';

const useStyles = makeStyles(() => createStyles({}));

const TopAppBar = (props: Props): JSX.Element => {
  const classes = useStyles();
  const {
    title,
    displayFavorites,
    displayBackButton,
    goBackHandler,
    isInMultiSelectMode,
  } = props;

  const signOut = async () => {
    window.location.replace('/');
    await auth.signOut();
  };

  return (
    <AppBar position="fixed" data-testid="top-app-bar">
      {isInMultiSelectMode ? (
        <MultiSelectModeToolbar />
      ) : displayFavorites ? (
        <FavoritesToolbar />
      ) : (
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            sx={{
              mr: 2,
            }}
            onClick={() => {
              displayBackButton
                ? goBackHandler()
                : console.log('hamburger clicked');
            }}
          >
            {displayBackButton ? <ArrowBackIcon /> : <MenuIcon />}
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
                {title}
              </Typography>
            </Grid>
            <Grid item>
              <ActionMenu />
            </Grid>
          </Grid>
        </Toolbar>
      )}
    </AppBar>
  );
};

type Props = StateProps & DispatchProps;

interface StateProps {
  isInMultiSelectMode: boolean;
  title: string;
  displayBackButton: boolean;
  displayFavorites: boolean;
}

interface DispatchProps {
  goBackHandler: () => void;
}

const mapStateToProps = (state: State): StateProps => {
  const currentLocation = state.applicationState.currentLocation;
  const currentAlbum = state.selectedAlbumState.currentAlbum;
  let title = `Yarbrough Photo's App`;
  let displayBackButton = false;
  if (currentLocation === AppPaths.selectedAlbum && currentAlbum) {
    displayBackButton = true;
    title = currentAlbum.title;
  }
  return {
    title: `${title} Album`,
    displayBackButton,
    isInMultiSelectMode: state.selectedAlbumState.isInMultiSelectMode,
    displayFavorites: state.selectedAlbumState.displayFavorites,
  };
};

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  goBackHandler: () => {
    dispatch(routerActions.push(AppPaths.dashboard));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(TopAppBar);
