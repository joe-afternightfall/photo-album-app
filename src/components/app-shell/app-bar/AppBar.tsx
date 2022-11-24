import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LogoutIcon from '@mui/icons-material/Logout';
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
import { AlbumVO } from '../../../configs/interfaces';
import { State } from '../../../configs/redux/store';
import MultiSelectToolbar from './variants/MultiSelectToolbar';

const useStyles = makeStyles(() => createStyles({}));

const TopAppBar = (props: Props): JSX.Element => {
  const classes = useStyles();
  const { title, displayBackButton, goBackHandler, isInMultiSelectMode } =
    props;

  const signOut = async () => {
    window.location.replace('/');
    await auth.signOut();
  };

  return (
    <AppBar position="fixed" data-testid="top-app-bar">
      {isInMultiSelectMode ? (
        <MultiSelectToolbar />
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
              <IconButton onClick={signOut}>
                <LogoutIcon />
              </IconButton>
            </Grid>
          </Grid>
        </Toolbar>
      )}
    </AppBar>
  );
};

type Props = PassedInProps & StateProps & DispatchProps;

interface PassedInProps {
  DELETE_ME?: string;
}

interface StateProps {
  isInMultiSelectMode: boolean;
  selectedAlbum?: AlbumVO;
  title: string;
  displayBackButton: boolean;
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
    selectedAlbum: state.selectedAlbumState.currentAlbum,
  };
};

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  goBackHandler: () => {
    dispatch(routerActions.push(AppPaths.dashboard));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(TopAppBar);
