import PanoramaIcon from '@mui/icons-material/Panorama';
import ViewQuiltIcon from '@mui/icons-material/ViewQuilt';
import Grid from '@mui/material/Grid';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Typography from '@mui/material/Typography';
import React from 'react';
import { connect } from 'react-redux';

import { AlbumVO, ImageVO } from '../../configs/interfaces';
import { State } from '../../configs/redux/store';
import GalleryView from '../widgets/gallery/Gallery';
import ListView from '../widgets/list-view/ListView';
import UploadDialog from './selected-album-screen/components/UploadDialog';

const SelectedAlbumScreen = (props: SelectedAlbumScreenProps): JSX.Element => {
  const { images, selectedAlbum } = props;

  const [view, setView] = React.useState<string | null>('list-view');

  const handleToggle = (
    event: React.MouseEvent<HTMLElement>,
    newView: string | null
  ) => {
    setView(newView);
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
              <ToggleButtonGroup value={view} exclusive onChange={handleToggle}>
                <ToggleButton value="list-view">
                  <ViewQuiltIcon />
                </ToggleButton>
                <ToggleButton value="gallery-view">
                  <PanoramaIcon />
                </ToggleButton>
              </ToggleButtonGroup>
            </Grid>
            <Grid item>
              <UploadDialog />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        {view === 'list-view' && <ListView images={images} />}
        {view === 'gallery-view' && <GalleryView images={images} />}
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
