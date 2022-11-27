import isEmpty from 'is-empty';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { AlbumVO, ImageVO } from '../../../configs/interfaces';
import { State } from '../../../configs/redux/store';
import {
  filterImagesForAccessType,
  filterImagesForFavorites,
} from '../../../utils/filter-images';
import ListView from '../../widgets/views/list-view/ListView';

const SelectedAlbumScreen = (props: SelectedAlbumScreenProps): JSX.Element => {
  const { albumImages, selectedAlbum, favoriteImages, displayFavorites } =
    props;

  useEffect(() => {
    if (isEmpty(selectedAlbum)) {
      window.location.replace('/');
    }
  }, [selectedAlbum]);

  const imagesToDisplay = displayFavorites ? favoriteImages : albumImages;

  return <ListView images={imagesToDisplay} />;
};

type SelectedAlbumScreenProps = StateProps;

interface StateProps {
  selectedAlbum?: AlbumVO;
  albumImages: ImageVO[];
  favoriteImages: ImageVO[];
  displayFavorites: boolean;
}

const mapStateToProps = (state: State): StateProps => {
  const signedInUser = state.applicationState.signedInUser;
  const selectedAlbum = state.selectedAlbumState.currentAlbum;
  const accessType = state.selectedAlbumState.filterImagesForAccessType;
  let favoriteImages: ImageVO[] = [];

  if (selectedAlbum) {
    filterImagesForAccessType(selectedAlbum, accessType);
  }

  if (signedInUser && signedInUser.favoriteImageIds.length && selectedAlbum) {
    favoriteImages = filterImagesForFavorites(
      signedInUser.favoriteImageIds,
      selectedAlbum.images
    );
  }

  if (selectedAlbum && selectedAlbum.imagesShouldBeOrdered) {
    selectedAlbum.images.sort((a, b) => {
      const aFileName = a.fileName.split('.');
      const bFileName = b.fileName.split('.');
      return Number(aFileName[0]) - Number(bFileName[0]);
    });
  }

  return {
    selectedAlbum,
    albumImages: selectedAlbum ? selectedAlbum.images : [],
    favoriteImages,
    displayFavorites: state.selectedAlbumState.displayFavorites,
  };
};

export default connect(mapStateToProps)(SelectedAlbumScreen);
