import { Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';

import { ImageVO } from '../configs/interfaces';
import { State } from '../configs/redux/store';
import { ApplicationActions } from '../creators/actions';
import {
  displayErrorSnackbar,
  displaySuccessSnackbar,
} from '../creators/app-snackbar';
import { zipImages } from './save-images';

export const zipAndSaveSelectedAlbumFavorites =
  (): ThunkAction<void, State, void, ApplicationActions> =>
  async (dispatch: Dispatch, getState: () => State): Promise<void> => {
    const state = getState();

    const signedInUser = state.applicationState.signedInUser;
    const selectedAlbum = state.selectedAlbumState.currentAlbum;
    const favoriteImages: ImageVO[] = [];

    if (selectedAlbum && signedInUser && signedInUser.favoriteImageIds.length) {
      signedInUser.favoriteImageIds.map((favId) => {
        selectedAlbum.images.find((image) => {
          if (image.id === favId) {
            favoriteImages.push(image);
          }
        });
      });
    }

    if (selectedAlbum && favoriteImages.length > 0) {
      zipImages(`${selectedAlbum.title}-favorites`, favoriteImages)
        .catch((e) => {
          console.log('e: ' + JSON.stringify(e));
          dispatch(displayErrorSnackbar(`Error downloading favorite's`));
        })
        .then(() => {
          dispatch(displaySuccessSnackbar(`Downloaded selected favorite's`));
        });
    }
  };
