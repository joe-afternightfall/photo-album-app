import { ActionTypes } from './actions';

export interface AppSnackbarProps {
  message: string;
  severity: 'success' | 'info' | 'warning' | 'error';
  position: {
    vertical: 'top' | 'bottom';
    horizontal: 'left' | 'center' | 'right';
  };
}

export interface DisplayAppSnackbarAction {
  type: ActionTypes.DISPLAY_APP_SNACKBAR;
  props: AppSnackbarProps;
}

export const displaySuccessSnackbar = (
  message: string
): DisplayAppSnackbarAction => {
  return {
    type: ActionTypes.DISPLAY_APP_SNACKBAR,
    props: {
      message,
      severity: 'success',
      position: {
        vertical: 'bottom',
        horizontal: 'left',
      },
    },
  };
};

export const displayErrorSnackbar = (
  message: string
): DisplayAppSnackbarAction => {
  return {
    type: ActionTypes.DISPLAY_APP_SNACKBAR,
    props: {
      message,
      severity: 'error',
      position: {
        vertical: 'bottom',
        horizontal: 'left',
      },
    },
  };
};

export const displayAppSnackbar = (
  props: AppSnackbarProps
): DisplayAppSnackbarAction => {
  return {
    type: ActionTypes.DISPLAY_APP_SNACKBAR,
    props: props,
  };
};

export interface HideAppSnackbarAction {
  type: ActionTypes.HIDE_APP_SNACKBAR;
}

export const hideAppSnackbar = (): HideAppSnackbarAction => {
  return {
    type: ActionTypes.HIDE_APP_SNACKBAR,
  };
};
