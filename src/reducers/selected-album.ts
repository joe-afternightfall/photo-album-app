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
    }
    return newState;
  },
};

export interface SelectedAlbumState {
  currentAlbum?: AlbumVO;
  filterImagesForAccessType: ACCESS_TYPE;
}
