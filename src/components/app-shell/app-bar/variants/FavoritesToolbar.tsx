import CloseIcon from '@mui/icons-material/Close';
import CollectionsIcon from '@mui/icons-material/Collections';
import DownloadIcon from '@mui/icons-material/Download';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

import { State } from '../../../../configs/redux/store';
import { ApplicationActions } from '../../../../creators/actions';
import { clearFavorites } from '../../../../creators/selected-album/favorites';
import { getNumberOfFavorites } from '../../../../utils/string-formatter';
import { zipAndSaveSelectedAlbumFavorites } from '../../../../utils/zip-images';

const FavoritesToolbar = (props: FavoritesToolbarProps): JSX.Element => {
  const { numberOfFavorites, clearFavoritesHandler, downloadFavoritesHandler } =
    props;

  return (
    <Toolbar>
      <IconButton
        color="inherit"
        edge="start"
        sx={{
          mr: 2,
        }}
        data-testid="clear-favorites"
        onClick={clearFavoritesHandler}
      >
        <CloseIcon />
      </IconButton>
      <Grid
        item
        xs={12}
        container
        alignItems="center"
        justifyContent="space-between"
      >
        <Grid item sx={{ flex: 1 }}>
          <Typography
            variant="h6"
            noWrap
            component="div"
            data-testid="app-bar-title"
          >
            {`Favorites (${numberOfFavorites})`}
          </Typography>
        </Grid>
        <Grid item>
          <Grid container spacing={2}>
            <Grid item>
              <Button
                variant="outlined"
                startIcon={<DownloadIcon />}
                onClick={downloadFavoritesHandler}
              >
                {`Download fav's`}
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="outlined"
                startIcon={<CollectionsIcon />}
                onClick={clearFavoritesHandler}
              >
                {`All Photos`}
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Toolbar>
  );
};

type FavoritesToolbarProps = StateProps & DispatchProps;

interface DispatchProps {
  clearFavoritesHandler: () => void;
  downloadFavoritesHandler: () => void;
}

interface StateProps {
  numberOfFavorites: number;
}

const mapStateToProps = (state: State): StateProps => {
  const signedInUser = state.applicationState.signedInUser;
  const currentAlbum = state.selectedAlbumState.currentAlbum;
  let numberOfFavorites = 0;

  if (signedInUser && currentAlbum) {
    const favoriteImageIds = signedInUser.favoriteImageIds;
    numberOfFavorites = getNumberOfFavorites(currentAlbum, favoriteImageIds);
  }

  return {
    numberOfFavorites,
  };
};

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  clearFavoritesHandler: () => {
    dispatch(clearFavorites());
  },
  downloadFavoritesHandler: () => {
    (dispatch as ThunkDispatch<State, void, ApplicationActions>)(
      zipAndSaveSelectedAlbumFavorites()
    );
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(FavoritesToolbar);
