import { AccessRequestVO } from '../configs/interfaces/access-request/AccessRequestVO';
import { ActionTypes } from './actions';

export interface LoadNewUserRequestsAction {
  type: ActionTypes.LOAD_NEW_USER_REQUESTS;
  requests: AccessRequestVO[];
}

export const loadNewUserRequests = (
  requests: AccessRequestVO[]
): LoadNewUserRequestsAction => {
  return {
    type: ActionTypes.LOAD_NEW_USER_REQUESTS,
    requests,
  };
};
