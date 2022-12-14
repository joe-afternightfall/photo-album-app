import CloseIcon from '@mui/icons-material/Close';
import DownloadIcon from '@mui/icons-material/Download';
import StarBorderIcon from '@mui/icons-material/StarBorderRounded';
import StarIcon from '@mui/icons-material/StarRounded';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

import { ImageVO } from '../../../../configs/interfaces';
import { State } from '../../../../configs/redux/store';
import { ApplicationActions } from '../../../../creators/actions';
import {
  clearMultiSelectIds,
  toggleMultiSelectMode,
} from '../../../../creators/selected-album/multi-select-mode';
import {
  removeSelectedImageIdsFromUsersFavoriteList,
  tagSelectedImagesAsFavorites,
} from '../../../../firebase/services/firebase-users-service';
import { zipImages } from '../../../../utils/zip-images';
import AppTooltip from '../../../shared/app-tooltip/AppTooltip';
import MultiSelectAdminActions from '../components/multi-select-admin-actions/MultiSelectAdminActions';

const MultiSelectModeToolbar = (props: Props): JSX.Element => {
  const {
    userIsAdmin,
    selectedImages,
    allImagesAreFavorites,
    downloadHandler,
    updateFavoritesHandler,
    exitMultiSelectModeHandler,
  } = props;

  return (
    <Toolbar>
      <IconButton
        color="inherit"
        edge="start"
        sx={{
          mr: 2,
        }}
        data-testid="exit-multi-select"
        onClick={exitMultiSelectModeHandler}
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
        <Grid item>
          <Typography
            variant="h6"
            noWrap
            component="div"
            data-testid="app-bar-title"
          >
            {selectedImages.length + ' selected'}
          </Typography>
        </Grid>
        <Grid item>
          <Grid container>
            <Grid item>
              <AppTooltip title="Favorite" placement="bottom" arrow>
                <IconButton
                  sx={{ mr: 1 }}
                  onClick={() => {
                    updateFavoritesHandler(allImagesAreFavorites);
                  }}
                >
                  {allImagesAreFavorites ? <StarIcon /> : <StarBorderIcon />}
                </IconButton>
              </AppTooltip>
            </Grid>
            <Grid item>
              <AppTooltip title="Download" placement="bottom" arrow>
                <IconButton
                  sx={{ mr: 1 }}
                  onClick={() => {
                    downloadHandler(selectedImages);
                  }}
                >
                  <DownloadIcon />
                </IconButton>
              </AppTooltip>
            </Grid>
            {userIsAdmin && (
              <MultiSelectAdminActions selectedImages={selectedImages} />
            )}
          </Grid>
        </Grid>
      </Grid>
    </Toolbar>
  );
};

type Props = StateProps & DispatchProps;

interface StateProps {
  userIsAdmin: boolean;
  selectedImages: ImageVO[];
  allImagesAreFavorites: boolean;
}

interface DispatchProps {
  exitMultiSelectModeHandler: () => void;
  downloadHandler: (images: ImageVO[]) => void;
  updateFavoritesHandler: (allImagesAreFavorites: boolean) => void;
}

const mapStateToProps = (state: State): StateProps => {
  const signedInUser = state.applicationState.signedInUser;
  const selectedIds = state.selectedAlbumState.selectedImageIdsForMultiEditing;
  const selectedImages: ImageVO[] = [];
  const favoriteSelectedImages: string[] = [];

  selectedIds.map((imageId: string) => {
    const foundImage = state.applicationState.images.find(
      (image) => image.id === imageId
    );
    if (foundImage) {
      selectedImages.push(foundImage);
      if (signedInUser) {
        signedInUser.favoriteImageIds.map((favId) => {
          if (foundImage.id === favId) {
            favoriteSelectedImages.push(favId);
          }
        });
      }
    }
  });

  return {
    userIsAdmin: state.applicationState.userIsAdmin,
    selectedImages,
    allImagesAreFavorites:
      favoriteSelectedImages.length === selectedImages.length,
  };
};

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  exitMultiSelectModeHandler: () => {
    dispatch(toggleMultiSelectMode(false));
    dispatch(clearMultiSelectIds());
  },
  downloadHandler: async (images: ImageVO[]) => {
    await zipImages('selected-images', images);
    dispatch(toggleMultiSelectMode(false));
    dispatch(clearMultiSelectIds());
  },
  updateFavoritesHandler: async (allImagesAreFavorites: boolean) => {
    if (allImagesAreFavorites) {
      (dispatch as ThunkDispatch<State, void, ApplicationActions>)(
        removeSelectedImageIdsFromUsersFavoriteList()
      );
      dispatch(toggleMultiSelectMode(false));
      dispatch(clearMultiSelectIds());
    } else {
      (dispatch as ThunkDispatch<State, void, ApplicationActions>)(
        tagSelectedImagesAsFavorites()
      );
      dispatch(toggleMultiSelectMode(false));
      dispatch(clearMultiSelectIds());
    }
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MultiSelectModeToolbar);
