import CloseIcon from '@mui/icons-material/Close';
import DownloadIcon from '@mui/icons-material/Download';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { makeStyles, createStyles } from '@mui/styles';
import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { State } from '../../../../configs/redux/store';
import { clearFavorites } from '../../../../creators/selected-album/favorites';
import AppTooltip from '../../../shared/app-tooltip/AppTooltip';

const useStyles = makeStyles(() => createStyles({}));

const FavoritesToolbar = (props: FavoritesToolbarProps): JSX.Element => {
  const classes = useStyles();
  const { clearFavoritesHandler } = props;

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
            {'Favorites'}
          </Typography>
        </Grid>
        <Grid item>
          <AppTooltip title="Download" placement="bottom" arrow>
            <IconButton
              onClick={() => {
                console.log('download clicked');
                // downloadHandler(selectedImages);
              }}
            >
              <DownloadIcon />
            </IconButton>
          </AppTooltip>
        </Grid>
      </Grid>
    </Toolbar>
  );
};

type FavoritesToolbarProps = PassedInProps & StateProps & DispatchProps;

interface PassedInProps {
  DELETE_ME?: string;
}

interface StateProps {
  DELETE_ME?: string;
}

interface DispatchProps {
  clearFavoritesHandler: () => void;
}

const mapStateToProps = (state: State): StateProps => {
  return {};
};

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  clearFavoritesHandler: () => {
    dispatch(clearFavorites());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(FavoritesToolbar);
