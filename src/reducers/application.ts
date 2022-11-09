import { LOCATION_CHANGE } from 'connected-react-router';

import { adminEmails } from '../configs/app-settings/admin-emails';
import { AlbumVO } from '../configs/interfaces';
import { ActionTypes, ApplicationActions } from '../creators/actions';
import { AppSnackbarProps } from '../creators/app-snackbar';

export default {
  reducer: (
    state: ApplicationState = {} as unknown as ApplicationState,
    action: ApplicationActions
  ): ApplicationState => {
    const newState = Object.assign({}, state);

    switch (action.type) {
      case LOCATION_CHANGE: {
        newState.currentLocation = action.payload.location.pathname;
        break;
      }
      case ActionTypes.LOGGED_IN_USER: {
        newState.userIsAdmin = adminEmails.includes(action.email);
        break;
      }
      case ActionTypes.LOAD_ALBUMS:
        newState.albums = action.albums;
        break;
      case ActionTypes.DISPLAY_APP_SNACKBAR:
        newState.displayAppSnackbar = true;
        newState.snackbarProps = action.props;
        break;
      case ActionTypes.HIDE_APP_SNACKBAR:
        newState.displayAppSnackbar = false;
        break;
      case ActionTypes.TOGGLE_APP_LOADER:
        newState.displayAppLoader = action.display;
        break;
    }

    return newState;
  },
};

export interface ApplicationState {
  // activePage: PageInfoProps | undefined;
  // loggedInUser: UserDto | undefined;
  currentLocation: string;
  albums: AlbumVO[];
  userIsAdmin: boolean;
  displayAppSnackbar: boolean;
  displayAppLoader: boolean;
  snackbarProps: AppSnackbarProps;
}
