import { ActionTypes } from '../actions';

export interface ToggleDeleteImageDialogAction {
  type: ActionTypes.TOGGLE_DELETE_IMAGE_DIALOG;
  open: boolean;
  imageId: string;
  imageFirebaseId: string;
}

export const openDeleteImageDialog = (
  imageFirebaseId: string,
  imageId: string
): ToggleDeleteImageDialogAction => {
  return {
    type: ActionTypes.TOGGLE_DELETE_IMAGE_DIALOG,
    open: true,
    imageId,
    imageFirebaseId,
  };
};

export const closeDeleteImageDialog = (): ToggleDeleteImageDialogAction => {
  return {
    type: ActionTypes.TOGGLE_DELETE_IMAGE_DIALOG,
    open: false,
    imageId: '',
    imageFirebaseId: '',
  };
};
