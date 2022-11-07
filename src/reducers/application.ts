import { LOCATION_CHANGE } from 'connected-react-router';

import { ApplicationActions } from '../creators/actions';

export default {
  reducer: (
    state: ApplicationState = {} as unknown as ApplicationState,
    action: ApplicationActions
  ): ApplicationState => {
    const newState = Object.assign({}, state);

    switch (action.type) {
      case LOCATION_CHANGE: {
        newState.currentLocation = action.payload.location.pathname;
      }
    }

    return newState;
  },
};

export interface ApplicationState {
  // activePage: PageInfoProps | undefined;
  // loggedInUser: UserDto | undefined;
  currentLocation: string;
}
