import PanoramaIcon from '@mui/icons-material/Panorama';
import ViewQuiltIcon from '@mui/icons-material/ViewQuilt';
import Grid from '@mui/material/Grid';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Typography from '@mui/material/Typography';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import SwipeableViews from 'react-swipeable-views';

import { AlbumVO, ImageVO } from '../../configs/interfaces';
import { State } from '../../configs/redux/store';
import UploadImageDialog from '../widgets/dialogs/upload-image-dialog/UploadImageDialog';
import GalleryView from '../widgets/views/gallery-view/GalleryView';
import ListView from '../widgets/views/list-view/ListView';

const SelectedAlbumScreen = (props: SelectedAlbumScreenProps): JSX.Element => {
  const { images, selectedAlbum } = props;

  const [index, setIndex] = useState(0);

  const handleToggle = (
    event: React.MouseEvent<HTMLElement>,
    newView: string | null
  ) => {
    setIndex(Number(newView));
  };

  const handleChangeIndex = (index: number) => {
    setIndex(index);
  };

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
            <ListView images={images} />
          </div>
          <div>
            <GalleryView images={images} />
          </div>
        </SwipeableViews>
      </Grid>
    </Grid>
  );
};

type SelectedAlbumScreenProps = StateProps;

interface StateProps {
  selectedAlbum?: AlbumVO;
  images: ImageVO[];
}

const mapStateToProps = (state: State): StateProps => {
  const selectedAlbum = state.applicationState.selectedAlbumToView;
  const albumImages: ImageVO[] = [];
  if (selectedAlbum) {
    state.applicationState.images.forEach((image) => {
      if (image.albumId === selectedAlbum.id) {
        albumImages.push(image);
      }
    });
  }

  return {
    selectedAlbum: selectedAlbum,
    images: albumImages,
  };
};

export default connect(mapStateToProps)(SelectedAlbumScreen);
