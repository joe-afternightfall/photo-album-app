import isEmpty from 'is-empty';
import * as ramda from 'ramda';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { AlbumVO, ImageVO } from '../../../configs/interfaces';
import { ACCESS_TYPE } from '../../../configs/interfaces/image/ImageDAO';
import { State } from '../../../configs/redux/store';
import { filterImagesForAccessType } from '../../../utils/filter-images';
import { sortImagesByName } from '../../../utils/sorter';
import ListView from '../../widgets/views/list-view/ListView';

const SelectedAlbumScreen = (props: SelectedAlbumScreenProps): JSX.Element => {
  const { userIsAdmin, accessType, albumImages, selectedAlbum } = props;

  useEffect(() => {
    if (isEmpty(selectedAlbum)) {
      window.location.replace('/');
    }
  }, [selectedAlbum, accessType]);

  return <ListView images={albumImages} userIsAdmin={userIsAdmin} />;
};

type SelectedAlbumScreenProps = StateProps;

interface StateProps {
  selectedAlbum?: AlbumVO;
  albumImages: ImageVO[];
  userIsAdmin: boolean;
  accessType: ACCESS_TYPE;
}

const mapStateToProps = (state: State): StateProps => {
  const selectedAlbum = state.selectedAlbumState.currentAlbum;
  const accessType = state.selectedAlbumState.filterImagesForAccessType;
  let albumImages: ImageVO[] = [];

  if (selectedAlbum) {
    if (selectedAlbum.imagesShouldBeOrdered) {
      const clonedAlbum = ramda.clone(selectedAlbum);
      sortImagesByName(clonedAlbum.images);
      albumImages = filterImagesForAccessType(clonedAlbum, accessType);
    } else {
      albumImages = filterImagesForAccessType(selectedAlbum, accessType);
    }
  }

  return {
    selectedAlbum,
    albumImages,
    accessType,
    userIsAdmin: state.applicationState.userIsAdmin,
  };
};

export default connect(mapStateToProps)(SelectedAlbumScreen);
