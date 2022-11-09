import { ActionTypes } from './actions';

export interface ToggleAppLoaderAction {
  type: ActionTypes.TOGGLE_APP_LOADER;
  display: boolean;
}

export const displayAppLoader = (): ToggleAppLoaderAction => {
  return {
    type: ActionTypes.TOGGLE_APP_LOADER,
    display: true,
  };
};

export const hideAppLoader = (): ToggleAppLoaderAction => {
  return {
    type: ActionTypes.TOGGLE_APP_LOADER,
    display: false,
  };
};
