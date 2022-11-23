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
