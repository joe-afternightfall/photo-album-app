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

export interface LoadUsersAction {
  type: ActionTypes.LOAD_USERS;
  users: UserVO[];
}

export const loadUsers = (users: UserVO[]): LoadUsersAction => {
  return {
    type: ActionTypes.LOAD_USERS,
    users,
  };
};
