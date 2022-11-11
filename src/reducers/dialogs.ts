import { AlbumVO } from '../configs/interfaces';
import { ActionTypes, ApplicationActions } from '../creators/actions';
import { closeDeleteImageDialog } from '../creators/dialogs/delete-image';

export default {
  reducer: (
    state: AppDialogState = {} as unknown as AppDialogState,
    action: ApplicationActions
  ): AppDialogState => {
    const newState = Object.assign({}, state);

    switch (action.type) {
      case ActionTypes.TOGGLE_ALBUM_INFO_DIALOG:
        newState.displayAlbumInfoDialog = action.open;
        newState.selectedAlbumToEdit = action.album;
        break;
      case ActionTypes.TOGGLE_DELETE_IMAGE_DIALOG:
        newState.deleteImageDialog = {
          display: action.open,
          imageId: action.imageId,
          imageFirebaseId: action.imageFirebaseId,
        };
        break;
    }

    return newState;
  },
};

export interface AppDialogState {
  displayAlbumInfoDialog: boolean;
  selectedAlbumToEdit?: AlbumVO;
  deleteImageDialog: {
    display: boolean;
    imageId: string;
    imageFirebaseId: string;
  };
}
