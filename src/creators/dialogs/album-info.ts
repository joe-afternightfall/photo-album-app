import { ActionTypes } from '../actions';

export interface ToggleAlbumInfoDialogAction {
  type: ActionTypes.TOGGLE_ALBUM_INFO_DIALOG;
  open: boolean;
}

export const openAlbumInfoDialog = (): ToggleAlbumInfoDialogAction => {
  return {
    type: ActionTypes.TOGGLE_ALBUM_INFO_DIALOG,
    open: true,
  };
};

export const closeAlbumInfoDialog = (): ToggleAlbumInfoDialogAction => {
  return {
    type: ActionTypes.TOGGLE_ALBUM_INFO_DIALOG,
    open: false,
  };
};
