import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
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
import { tagSelectedImagesAsFavorites } from '../../../../firebase/services/firebase-users-service';
import { zipImages } from '../../../../utils/save-images';
import AppTooltip from '../../../shared/app-tooltip/AppTooltip';

const MultiSelectToolbar = (props: Props): JSX.Element => {
  const {
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
        <Grid item sx={{ flex: 1 }}>
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
          <AppTooltip title="Favorite" placement="bottom" arrow>
            <IconButton
              onClick={() => {
                updateFavoritesHandler(allImagesAreFavorites);
              }}
            >
              {/*todo: if all photos selected are favs, toggle off, otherwise toggle favs*/}
              {allImagesAreFavorites ? <StarIcon /> : <StarBorderIcon />}
            </IconButton>
          </AppTooltip>
        </Grid>
        {/*<Grid item>*/}
        {/*  <AppTooltip title="Add to" placement="bottom" arrow>*/}
        {/*    <IconButton>*/}
        {/*      /!*todo: get the add to functionality working, pop menu asking add to new album or existing*!/*/}
        {/*      <AddIcon />*/}
        {/*    </IconButton>*/}
        {/*  </AppTooltip>*/}
        {/*</Grid>*/}
        <Grid item>
          <AppTooltip title="Download" placement="bottom" arrow>
            <IconButton
              onClick={() => {
                downloadHandler(selectedImages);
              }}
            >
              <DownloadIcon />
            </IconButton>
          </AppTooltip>
        </Grid>
        <Grid item>
          <AppTooltip title="Delete" placement="bottom" arrow>
            <IconButton>
              {/*todo: delete selected images*/}
              <DeleteIcon />
            </IconButton>
          </AppTooltip>
        </Grid>
      </Grid>
    </Toolbar>
  );
};

type Props = PassedInProps & StateProps & DispatchProps;

interface PassedInProps {
  DELETE_ME?: string;
}

interface StateProps {
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
      console.log('inside first if');
    } else {
      (dispatch as ThunkDispatch<State, void, ApplicationActions>)(
        tagSelectedImagesAsFavorites()
      );
      dispatch(toggleMultiSelectMode(false));
      dispatch(clearMultiSelectIds());
    }
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(MultiSelectToolbar);
