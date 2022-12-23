import { UserVO } from '../../configs/interfaces/user/UserVO';
import { ActionTypes } from '../actions';

export interface ToggleUserInfoDialogAction {
  type: ActionTypes.TOGGLE_USER_INFO_DIALOG;
  open: boolean;
  user?: UserVO;
}

export const openUserInfoDialog = (
  user?: UserVO
): ToggleUserInfoDialogAction => {
  return {
    type: ActionTypes.TOGGLE_USER_INFO_DIALOG,
    open: true,
    user,
  };
};

export const closeUserInfoDialog = (): ToggleUserInfoDialogAction => {
  return {
    type: ActionTypes.TOGGLE_USER_INFO_DIALOG,
    open: false,
    user: undefined,
  };
};
