import { UserVO } from '../configs/interfaces/user/UserVO';
import { ActionTypes } from './actions';

export interface LoggedInUserAction {
  type: ActionTypes.LOGGED_IN_USER;
  user?: UserVO;
}

export const loggedInUser = (user?: UserVO): LoggedInUserAction => {
  return {
    type: ActionTypes.LOGGED_IN_USER,
    user,
  };
};
