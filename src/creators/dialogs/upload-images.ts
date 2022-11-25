import { ActionTypes } from '../actions';

export interface ToggleUploadImagesDialogAction {
  type: ActionTypes.TOGGLE_UPLOAD_IMAGES_DIALOG;
  open: boolean;
}

export const openUploadImagesDialog = (): ToggleUploadImagesDialogAction => {
  return {
    type: ActionTypes.TOGGLE_UPLOAD_IMAGES_DIALOG,
    open: true,
  };
};

export const closeUploadImagesDialog = (): ToggleUploadImagesDialogAction => {
  return {
    type: ActionTypes.TOGGLE_UPLOAD_IMAGES_DIALOG,
    open: false,
  };
};
