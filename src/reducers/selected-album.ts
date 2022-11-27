import * as ramda from 'ramda';

import { AlbumVO, ImageVO } from '../configs/interfaces';
import { ACCESS_TYPE } from '../configs/interfaces/image/ImageDAO';
import { ActionTypes, ApplicationActions } from '../creators/actions';
import { filterImagesForAccessType } from '../utils/filter-images';

export default {
  reducer: (
    state: SelectedAlbumState = {} as unknown as SelectedAlbumState,
    action: ApplicationActions
  ): SelectedAlbumState => {
    const newState = Object.assign({}, state);

    switch (action.type) {
      case ActionTypes.LOAD_ALBUMS: {
        if (newState.currentAlbum) {
          const currentAlbumId = newState.currentAlbum.id;
          action.albums.find((album) => {
            if (album.id === currentAlbumId) {
              newState.currentAlbum = album;
            }
          });
        }
        break;
      }
      case ActionTypes.SELECT_ALBUM_TO_VIEW: {
        newState.currentAlbum = action.album;
        newState.imagesToDisplay = filterImagesForAccessType(
          newState.currentAlbum,
          ACCESS_TYPE.ALL
        );
        break;
      }
      case ActionTypes.FILTER_IMAGES_BY_ACCESS_TYPE: {
        newState.filterImagesForAccessType = action.accessType;
        break;
      }
      case ActionTypes.TOGGLE_MULTI_SELECT_MODE:
        newState.isInMultiSelectMode = action.isInMultiSelectMode;
        break;
      case ActionTypes.UPDATE_MULTI_SELECT_IDS: {
        const clonedList = ramda.clone(
          newState.selectedImageIdsForMultiEditing
        );
        const imageId = action.imageId;
        const imageIndex = clonedList.indexOf(imageId);

        if (imageIndex === -1) {
          clonedList.push(imageId);
          newState.selectedImageIdsForMultiEditing = clonedList;
        } else {
          const newList = clonedList.filter((id) => id !== imageId);
          if (newList.length === 0) {
            newState.isInMultiSelectMode = false;
          }
          newState.selectedImageIdsForMultiEditing = newList;
        }
        break;
      }
      case ActionTypes.CLEAR_MULTI_SELECT_IDS:
        newState.selectedImageIdsForMultiEditing = [];
        newState.hoveringOverUncheckedIconId = '';
        break;
      case ActionTypes.UPDATE_HOVERING_OVER_ICON_ID:
        newState.hoveringOverUncheckedIconId = action.iconId;
        break;
      case ActionTypes.TOGGLE_FAVORITES:
        newState.displayFavorites = action.displayFavorites;
        break;
    }
    return newState;
  },
};

export interface SelectedAlbumState {
  currentAlbum?: AlbumVO;
  imagesToDisplay: ImageVO[];
  filterImagesForAccessType: ACCESS_TYPE;
  isInMultiSelectMode: boolean;
  selectedImageIdsForMultiEditing: string[];
  hoveringOverUncheckedIconId: string;
  displayFavorites: boolean;
}
