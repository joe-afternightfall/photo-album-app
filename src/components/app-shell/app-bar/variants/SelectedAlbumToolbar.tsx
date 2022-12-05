import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { routerActions } from 'connected-react-router';
import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { AppPaths } from '../../../../configs/app-settings/app-routes';
import { State } from '../../../../configs/redux/store';
import AlbumActionMenu from '../components/album-action-menu/AlbumActionMenu';
import ImageAccessTypePopover from '../components/image-access-type-popover/ImageAccessTypePopover';

const SelectedAlbumToolbar = (props: Props): JSX.Element => {
  const { title, goBackHandler, numberOfPics, userIsAdmin } = props;

  return (
    <Toolbar>
      <IconButton
        color="inherit"
        edge="start"
        sx={{
          mr: 2,
        }}
        onClick={goBackHandler}
      >
        <ArrowBackIcon />
      </IconButton>
      <Grid
        item
        xs={12}
        container
        alignItems="center"
        justifyContent="space-between"
      >
        <Grid item>
          <Typography variant="h6" noWrap component="div">
            {`${title}: ${numberOfPics} total pics`}
          </Typography>
        </Grid>
        <Grid item>
          <Grid container alignItems="center">
            {userIsAdmin && (
              <Grid item>
                <ImageAccessTypePopover />
              </Grid>
            )}
            <Grid item>
              <AlbumActionMenu />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Toolbar>
  );
};

type Props = StateProps & DispatchProps;

interface StateProps {
  userIsAdmin: boolean;
  title: string;
  numberOfPics: number;
}

interface DispatchProps {
  goBackHandler: () => void;
}

const mapStateToProps = (state: State): StateProps => {
  const currentAlbum = state.selectedAlbumState.currentAlbum;
  let title = '';
  if (currentAlbum) {
    title = currentAlbum.title;
  }

  return {
    title,
    userIsAdmin: Boolean(state.applicationState.signedInUser?.isAdmin),
    numberOfPics: currentAlbum ? currentAlbum.images.length : 0,
  };
};

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  goBackHandler: () => {
    dispatch(routerActions.push(AppPaths.dashboard));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectedAlbumToolbar);
