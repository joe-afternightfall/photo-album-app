import { AlbumVO } from '../../configs/interfaces';
import { ActionTypes } from '../actions';

export interface ToggleAlbumInfoDialogAction {
  type: ActionTypes.TOGGLE_ALBUM_INFO_DIALOG;
  open: boolean;
  album?: AlbumVO;
}

export const openAlbumInfoDialog = (
  album?: AlbumVO
): ToggleAlbumInfoDialogAction => {
  return {
    type: ActionTypes.TOGGLE_ALBUM_INFO_DIALOG,
    open: true,
    album,
  };
};

export const closeAlbumInfoDialog = (): ToggleAlbumInfoDialogAction => {
  return {
    type: ActionTypes.TOGGLE_ALBUM_INFO_DIALOG,
    open: false,
    album: undefined,
  };
};
