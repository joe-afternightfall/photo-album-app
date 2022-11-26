import AppBar from '@mui/material/AppBar';
import React from 'react';
import { connect } from 'react-redux';

import { AppPaths } from '../../../configs/app-settings/app-routes';
import { State } from '../../../configs/redux/store';
import FavoritesToolbar from './variants/FavoritesToolbar';
import GeneralToolbar from './variants/GeneralToolbar';
import MultiSelectModeToolbar from './variants/MultiSelectModeToolbar';
import SelectedAlbumToolbar from './variants/SelectedAlbumToolbar';

const TopAppBar = (props: Props): JSX.Element => {
  const {
    displayFavorites,
    isInMultiSelectMode,
    currentLocationIsSelectedAlbumScreen,
  } = props;

  let displayComp;

  if (currentLocationIsSelectedAlbumScreen) {
    if (isInMultiSelectMode) {
      displayComp = <MultiSelectModeToolbar />;
    } else if (displayFavorites) {
      displayComp = <FavoritesToolbar />;
    } else {
      displayComp = <SelectedAlbumToolbar />;
    }
  } else {
    displayComp = <GeneralToolbar />;
  }

  return (
    <AppBar position="fixed" data-testid="top-app-bar">
      {displayComp}
    </AppBar>
  );
};

type Props = StateProps;

interface StateProps {
  isInMultiSelectMode: boolean;
  displayFavorites: boolean;
  currentLocationIsSelectedAlbumScreen: boolean;
}

const mapStateToProps = (state: State): StateProps => {
  const currentLocation = state.applicationState.currentLocation;

  return {
    isInMultiSelectMode: state.selectedAlbumState.isInMultiSelectMode,
    displayFavorites: state.selectedAlbumState.displayFavorites,
    currentLocationIsSelectedAlbumScreen:
      currentLocation === AppPaths.selectedAlbum,
  };
};

export default connect(mapStateToProps)(TopAppBar);
