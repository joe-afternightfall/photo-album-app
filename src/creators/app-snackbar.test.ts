import { ActionTypes } from './actions';
import { displayAppSnackbar, hideAppSnackbar } from './app-snackbar';

describe('application snackbar', () => {
  it('should return', () => {
    const response = displayAppSnackbar({
      message: 'test app snackbar',
      severity: 'info',
      position: {
        vertical: 'top',
        horizontal: 'left',
      },
    });

    expect(response).toEqual({
      type: ActionTypes.DISPLAY_APP_SNACKBAR,
      props: {
        position: {
          vertical: 'top',
          horizontal: 'left',
        },
        severity: 'info',
        message: 'test app snackbar',
      },
    });
  });

  it('should return HIDE_APP_SNACKBAR', () => {
    const response = hideAppSnackbar();

    expect(response).toEqual({
      type: ActionTypes.HIDE_APP_SNACKBAR,
    });
  });
});
