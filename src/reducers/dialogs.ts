import { AlbumVO } from '../configs/interfaces';
import { UserVO } from '../configs/interfaces/user/UserVO';
import { ActionTypes, ApplicationActions } from '../creators/actions';
import { DeleteImageInfo } from '../creators/dialogs/delete-image';

export default {
  reducer: (
    state: AppDialogState = {} as unknown as AppDialogState,
    action: ApplicationActions
  ): AppDialogState => {
    const newState = Object.assign({}, state);

    switch (action.type) {
      case ActionTypes.TOGGLE_ALBUM_INFO_DIALOG:
        newState.albumInfoDialog = {
          display: action.open,
          selectedAlbumToEdit: action.album,
        };
        break;
      case ActionTypes.TOGGLE_DELETE_ALBUM_DIALOG:
        newState.deleteAlbumDialog = {
          display: action.open,
          album: action.album,
        };
        break;
      case ActionTypes.TOGGLE_DELETE_IMAGE_DIALOG:
        newState.deleteImageDialog = {
          display: action.open,
          images: action.info,
          cb: action.cb,
        };
        break;
      case ActionTypes.TOGGLE_UPLOAD_IMAGES_DIALOG:
        newState.uploadImageDialog.display = action.open;
        break;
      case ActionTypes.TOGGLE_USER_INFO_DIALOG:
        newState.userInfoDialog.display = action.open;
        newState.userInfoDialog.selectedUser = action.user;
        break;
    }

    return newState;
  },
};

export interface AppDialogState {
  albumInfoDialog: {
    display: boolean;
    selectedAlbumToEdit?: AlbumVO;
  };
  deleteAlbumDialog: {
    display: boolean;
    album?: AlbumVO;
  };
  deleteImageDialog: {
    display: boolean;
    images: DeleteImageInfo[];
    cb?: () => void;
  };
  uploadImageDialog: {
    display: boolean;
  };
  userInfoDialog: {
    display: boolean;
    selectedUser?: UserVO;
  };
}
