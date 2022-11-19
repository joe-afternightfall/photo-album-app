import { LOCATION_CHANGE } from 'connected-react-router';

import { AlbumVO, ImageVO } from '../configs/interfaces';
import { AccessRequestVO } from '../configs/interfaces/access-request/AccessRequestVO';
import { ACCESS_TYPE } from '../configs/interfaces/image/ImageDAO';
import { UserVO } from '../configs/interfaces/user/UserVO';
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
        newState.userIsAdmin = false;
        newState.signedInUser = action.user;
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
      case ActionTypes.SELECT_ALBUM_TO_VIEW:
        newState.selectedAlbumToView = action.album;
        break;
      case ActionTypes.LOAD_IMAGES:
        newState.images = action.images;
        break;
      case ActionTypes.FILTER_IMAGES_BY_ACCESS_TYPE:
        newState.filterImagesForAccessType = action.accessType;
        break;
      case ActionTypes.LOAD_NEW_USER_REQUESTS:
        newState.newUserRequests = action.requests;
        break;
    }

    return newState;
  },
};

export interface ApplicationState {
  // activePage: PageInfoProps | undefined;
  // loggedInUser: UserDto | undefined;
  newUserRequests: AccessRequestVO[];
  currentLocation: string;
  albums: AlbumVO[];
  userIsAdmin: boolean;
  displayAppSnackbar: boolean;
  displayAppLoader: boolean;
  snackbarProps: AppSnackbarProps;
  selectedAlbumToView?: AlbumVO;
  images: ImageVO[];
  signedInUser?: UserVO;
  filterImagesForAccessType: ACCESS_TYPE;
}
