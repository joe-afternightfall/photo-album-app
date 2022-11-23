import DownloadIcon from '@mui/icons-material/Download';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Typography from '@mui/material/Typography';
import isEmpty from 'is-empty';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { AlbumVO, ImageVO } from '../../../configs/interfaces';
import { State } from '../../../configs/redux/store';
import { filterImagesForAccessType } from '../../../utils/filter-images';
import { zipImages } from '../../../utils/save-images';
import UploadImageDialog from '../../widgets/dialogs/upload-image-dialog/UploadImageDialog';
import ListView from '../../widgets/views/list-view/ListView';
import ImageAccessTypeSelectMenu from './components/ImageAccessTypeSelectMenu';

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
  const selectedAlbum = state.selectedAlbumState.currentAlbum;
  const accessType = state.selectedAlbumState.filterImagesForAccessType;
  let albumImages: ImageVO[] = [];

  if (selectedAlbum) {
    albumImages = filterImagesForAccessType(
      selectedAlbum,
      state.applicationState.images,
      accessType
    );
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
