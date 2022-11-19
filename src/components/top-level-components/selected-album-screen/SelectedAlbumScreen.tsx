import DownloadIcon from '@mui/icons-material/Download';
import PanoramaIcon from '@mui/icons-material/Panorama';
import ViewQuiltIcon from '@mui/icons-material/ViewQuilt';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Typography from '@mui/material/Typography';
import isEmpty from 'is-empty';
import * as ramda from 'ramda';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import SwipeableViews from 'react-swipeable-views';

import { AlbumVO, ImageVO } from '../../../configs/interfaces';
import { ACCESS_TYPE } from '../../../configs/interfaces/image/ImageDAO';
import { State } from '../../../configs/redux/store';
import { zipImages } from '../../../utils/save-images';
import UploadImageDialog from '../../widgets/dialogs/upload-image-dialog/UploadImageDialog';
import GalleryView from '../../widgets/views/gallery-view/GalleryView';
import ListView from '../../widgets/views/list-view/ListView';
import ImageAccessTypeSelectMenu from './components/ImageAccessTypeSelectMenu';

const SelectedAlbumScreen = (props: SelectedAlbumScreenProps): JSX.Element => {
  const { albumImages, selectedAlbum, favoriteImages } = props;

  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (isEmpty(selectedAlbum)) {
      window.location.replace('/');
    }
  }, [selectedAlbum]);

  const handleToggle = (
    event: React.MouseEvent<HTMLElement>,
    newView: string | null
  ) => {
    setIndex(Number(newView));
  };

  const handleChangeIndex = (index: number) => {
    setIndex(index);
  };

  const [imageSelection, setImageSelection] = React.useState('all');

  const toggleImages = (
    event: React.MouseEvent<HTMLElement>,
    selection: string
  ) => {
    setImageSelection(selection);
  };

  const imagesToDisplay =
    imageSelection === 'all' ? albumImages : favoriteImages;

  return (
    <Grid container>
      <Grid
        item
        xs={12}
        container
        alignItems="center"
        justifyContent="space-between"
      >
        <Grid item>
          <Typography variant="h6" color="textSecondary">
            {selectedAlbum && selectedAlbum.title}
          </Typography>
        </Grid>
        <Grid item>
          <Grid container alignItems="center">
            <Grid item>
              <ToggleButtonGroup
                color="primary"
                value={imageSelection}
                exclusive
                onChange={toggleImages}
              >
                <ToggleButton value="all">All</ToggleButton>
                <ToggleButton value="favorites">Favorites</ToggleButton>
              </ToggleButtonGroup>
            </Grid>
            <Grid item>
              <Button
                variant="outlined"
                startIcon={<DownloadIcon />}
                onClick={() => {
                  selectedAlbum &&
                    zipImages(
                      `${selectedAlbum.title}-favorites`,
                      favoriteImages
                    );
                }}
              >
                {'Download Favs'}
              </Button>
            </Grid>
            <Grid item>
              <ImageAccessTypeSelectMenu />
            </Grid>
            <Grid item>
              <ToggleButtonGroup
                value={String(index)}
                exclusive
                onChange={handleToggle}
              >
                <ToggleButton value="0">
                  <ViewQuiltIcon />
                </ToggleButton>
                <ToggleButton value="1">
                  <PanoramaIcon />
                </ToggleButton>
              </ToggleButtonGroup>
            </Grid>
            <Grid item>
              <UploadImageDialog />
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <SwipeableViews index={index} onChangeIndex={handleChangeIndex}>
          <div>
            <ListView images={imagesToDisplay} />
          </div>
          <div>
            <GalleryView images={imagesToDisplay} />
          </div>
        </SwipeableViews>
      </Grid>
    </Grid>
  );
};

type SelectedAlbumScreenProps = StateProps;

interface StateProps {
  selectedAlbum?: AlbumVO;
  albumImages: ImageVO[];
  favoriteImageIds: string[];
  favoriteImages: ImageVO[];
}

const mapStateToProps = (state: State): StateProps => {
  const signedInUser = state.applicationState.signedInUser;
  const selectedAlbum = state.applicationState.selectedAlbumToView;
  const accessType = state.applicationState.filterImagesForAccessType;
  let albumImages: ImageVO[] = [];

  if (selectedAlbum) {
    state.applicationState.images.forEach((image) => {
      if (image.albumId === selectedAlbum.id) {
        albumImages.push(image);
      }
    });
    switch (accessType) {
      case ACCESS_TYPE.UNDEFINED: {
        const clonedImages = ramda.clone(albumImages);
        albumImages = clonedImages.filter(
          (image) => image.accessType === ACCESS_TYPE.UNDEFINED
        );
        break;
      }
      case ACCESS_TYPE.PUBLIC: {
        const clonedImages = ramda.clone(albumImages);
        albumImages = clonedImages.filter(
          (image) => image.accessType === ACCESS_TYPE.PUBLIC
        );
        break;
      }
      case ACCESS_TYPE.PRIVATE: {
        const clonedImages = ramda.clone(albumImages);
        albumImages = clonedImages.filter(
          (image) => image.accessType === ACCESS_TYPE.PRIVATE
        );
        break;
      }
      default:
        break;
    }
  }

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
    selectedAlbum: selectedAlbum,
    albumImages,
    favoriteImageIds: signedInUser ? signedInUser.favoriteImageIds : [],
    favoriteImages,
  };
};

export default connect(mapStateToProps)(SelectedAlbumScreen);
