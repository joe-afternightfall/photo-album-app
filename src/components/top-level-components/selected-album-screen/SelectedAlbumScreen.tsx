import DownloadIcon from '@mui/icons-material/Download';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Typography from '@mui/material/Typography';
import isEmpty from 'is-empty';
import * as ramda from 'ramda';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { AlbumVO, ImageVO } from '../../../configs/interfaces';
import { ACCESS_TYPE } from '../../../configs/interfaces/image/ImageDAO';
import { State } from '../../../configs/redux/store';
import { zipImages } from '../../../utils/save-images';
import UploadImageDialog from '../../widgets/dialogs/upload-image-dialog/UploadImageDialog';
import ImageAccessTypeSelectMenu from './components/ImageAccessTypeSelectMenu';
import ListView from '../../widgets/views/list-view/ListView';

const SelectedAlbumScreen = (props: SelectedAlbumScreenProps): JSX.Element => {
  const { albumImages, selectedAlbum, favoriteImages } = props;

  const [imageSelection, setImageSelection] = React.useState('all');

  useEffect(() => {
    if (isEmpty(selectedAlbum)) {
      window.location.replace('/');
    }
  }, [selectedAlbum]);

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
              <UploadImageDialog />
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <ListView images={imagesToDisplay} />
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
