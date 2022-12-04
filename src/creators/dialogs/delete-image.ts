import { ActionTypes } from '../actions';

export type DeleteImageInfo = {
  imageId: string;
  imageFirebaseId: string;
};

export interface ToggleDeleteImageDialogAction {
  type: ActionTypes.TOGGLE_DELETE_IMAGE_DIALOG;
  open: boolean;
  info: DeleteImageInfo[];
  cb?: () => void;
}

export const openDeleteImageDialog = (
  info: DeleteImageInfo[],
  cb?: () => void
): ToggleDeleteImageDialogAction => {
  return {
    type: ActionTypes.TOGGLE_DELETE_IMAGE_DIALOG,
    open: true,
    info,
    cb,
  };
};

export const closeDeleteImageDialog = (): ToggleDeleteImageDialogAction => {
  return {
    type: ActionTypes.TOGGLE_DELETE_IMAGE_DIALOG,
    open: false,
    info: [],
    cb: undefined,
  };
};
