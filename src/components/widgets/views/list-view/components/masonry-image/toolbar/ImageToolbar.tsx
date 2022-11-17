import DownloadIcon from '@mui/icons-material/Download';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import { createStyles, makeStyles } from '@mui/styles';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

import { AlbumVO, ImageVO } from '../../../../../../../configs/interfaces';
import { UserVO } from '../../../../../../../configs/interfaces/user/UserVO';
import { State } from '../../../../../../../configs/redux/store';
import { ApplicationActions } from '../../../../../../../creators/actions';
import {
  removeImageFromUsersFavoriteList,
  tagImageAsFavorite,
} from '../../../../../../../services/firebase-users-service';
import SettingsMenu from '../settings-menu/SettingsMenu';

const useStyles = makeStyles(() =>
  createStyles({
    iconButton: {
      color: 'rgba(255, 255, 255, 0.54)',
    },
  })
);

const ImageToolbar = (props: ImageToolbarProps): JSX.Element => {
  const classes = useStyles();
  const { image, favoriteImageIds, selectedAlbum, toggleFavHandler } = props;
  const [isFav, setIsFav] = useState(false);

  useEffect(() => {
    const foundIndex = favoriteImageIds.indexOf(image.id);
    setIsFav(foundIndex !== -1);
  }, [favoriteImageIds]);

  return (
    <ImageListItemBar
      sx={{ p: 0 }}
      actionIcon={
        <Grid container justifyContent="center">
          <Grid item>
            <IconButton
              className={classes.iconButton}
              onClick={(e) => {
                e.stopPropagation();
                toggleFavHandler(isFav);
              }}
            >
              {isFav ? <FavoriteIcon /> : <FavoriteBorderIcon />}
            </IconButton>
          </Grid>
          <Grid item>
            <IconButton className={classes.iconButton}>
              <DownloadIcon />
            </IconButton>
          </Grid>
          <Grid item>
            {selectedAlbum && (
              <SettingsMenu
                image={image}
                albumFirebaseId={selectedAlbum.firebaseId}
              />
            )}
          </Grid>
        </Grid>
      }
    />
  );
};

type ImageToolbarProps = PassedInProps & StateProps & DispatchProps;

interface PassedInProps {
  image: ImageVO;
}

interface StateProps {
  selectedAlbum?: AlbumVO;
  favoriteImageIds: string[];
  signedInUser?: UserVO;
}

interface DispatchProps {
  toggleFavHandler: (isFav: boolean) => void;
}

const mapStateToProps = (state: State): StateProps => {
  const signedInUser = state.applicationState.signedInUser;
  return {
    signedInUser,
    selectedAlbum: state.applicationState.selectedAlbumToView,
    favoriteImageIds: signedInUser ? signedInUser.favoriteImageIds : [],
  };
};

const mapDispatchToProps = (
  dispatch: Dispatch,
  ownProps: PassedInProps
): DispatchProps => ({
  toggleFavHandler: (isFav: boolean) => {
    (dispatch as ThunkDispatch<State, void, ApplicationActions>)(
      isFav
        ? removeImageFromUsersFavoriteList(ownProps.image.id)
        : tagImageAsFavorite(ownProps.image.id)
    );
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ImageToolbar);
