import { ActionTypes } from './actions';
import { displayAppLoader, hideAppLoader } from './app-loader';

describe('app loader creators', () => {
  it('should return display app loader action', () => {
    const action = displayAppLoader();

    expect(action).toEqual({
      type: ActionTypes.TOGGLE_APP_LOADER,
      display: true,
    });
  });

  it('should return hide app loader action', () => {
    const action = hideAppLoader();

    expect(action).toEqual({
      type: ActionTypes.TOGGLE_APP_LOADER,
      display: false,
    });
  });
});
