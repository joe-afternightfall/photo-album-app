import { ActionTypes } from './actions';

export interface LoggedInUserAction {
  type: ActionTypes.LOGGED_IN_USER;
  email: string;
}

export const loggedInUser = (email: string): LoggedInUserAction => {
  return {
    type: ActionTypes.LOGGED_IN_USER,
    email,
  };
};
