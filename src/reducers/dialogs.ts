import { ActionTypes, ApplicationActions } from '../creators/actions';

export default {
  reducer: (
    state: AppDialogState = {} as unknown as AppDialogState,
    action: ApplicationActions
  ): AppDialogState => {
    const newState = Object.assign({}, state);

    switch (action.type) {
      case ActionTypes.TOGGLE_ALBUM_INFO_DIALOG:
        newState.displayAlbumInfoDialog = action.open;
        break;
    }

    return newState;
  },
};

export interface AppDialogState {
  displayAlbumInfoDialog: boolean;
}
