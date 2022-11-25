import isEmpty from 'is-empty';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { AlbumVO, ImageVO } from '../../../configs/interfaces';
import { State } from '../../../configs/redux/store';
import ListView from '../../widgets/views/list-view/ListView';

const SelectedAlbumScreen = (props: SelectedAlbumScreenProps): JSX.Element => {
  const { albumImages, selectedAlbum, displayFavorites, favoriteImages } =
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
  const albumImages = state.selectedAlbumState.albumImages;
  const favoriteImages: ImageVO[] = [];

  if (signedInUser && signedInUser.favoriteImageIds.length) {
    signedInUser.favoriteImageIds.map((favId) => {
      albumImages.find((image) => {
        if (image.id === favId) {
          favoriteImages.push(image);
        }
      });
    });
  }

  return {
    selectedAlbum,
    albumImages,
    favoriteImages,
    displayFavorites: state.selectedAlbumState.displayFavorites,
  };
};

export default connect(mapStateToProps)(SelectedAlbumScreen);
