import * as ramda from 'ramda';

import { AlbumVO } from '../configs/interfaces';
import { ACCESS_TYPE } from '../configs/interfaces/image/ImageDAO';
import { ActionTypes, ApplicationActions } from '../creators/actions';

export default {
  reducer: (
    state: SelectedAlbumState = {} as unknown as SelectedAlbumState,
    action: ApplicationActions
  ): SelectedAlbumState => {
    const newState = Object.assign({}, state);

    switch (action.type) {
      case ActionTypes.SELECT_ALBUM_TO_VIEW:
        newState.currentAlbum = action.album;
        break;
      case ActionTypes.FILTER_IMAGES_BY_ACCESS_TYPE:
        newState.filterImagesForAccessType = action.accessType;
        break;
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
        break;
    }
    return newState;
  },
};

export interface SelectedAlbumState {
  currentAlbum?: AlbumVO;
  filterImagesForAccessType: ACCESS_TYPE;
  isInMultiSelectMode: boolean;
  selectedImageIdsForMultiEditing: string[];
}
