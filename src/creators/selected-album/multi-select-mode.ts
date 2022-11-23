import { ActionTypes } from '../actions';

export interface ToggleMultiSelectModeAction {
  type: ActionTypes.TOGGLE_MULTI_SELECT_MODE;
  isInMultiSelectMode: boolean;
}

export const toggleMultiSelectMode = (
  isInMultiSelectMode: boolean
): ToggleMultiSelectModeAction => {
  return {
    type: ActionTypes.TOGGLE_MULTI_SELECT_MODE,
    isInMultiSelectMode,
  };
};

export interface UpdateMultiSelectIdsAction {
  type: ActionTypes.UPDATE_MULTI_SELECT_IDS;
  imageId: string;
}

export const updateMultiSelectIds = (
  imageId: string
): UpdateMultiSelectIdsAction => {
  return {
    type: ActionTypes.UPDATE_MULTI_SELECT_IDS,
    imageId,
  };
};

export interface ClearMultiSelectIdsAction {
  type: ActionTypes.CLEAR_MULTI_SELECT_IDS;
}

export const clearMultiSelectIds = (): ClearMultiSelectIdsAction => {
  return {
    type: ActionTypes.CLEAR_MULTI_SELECT_IDS,
  };
};
