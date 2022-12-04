import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { routerActions } from 'connected-react-router';
import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { AppPaths } from '../../../../configs/app-settings/app-routes';
import { AlbumVO, ImageVO } from '../../../../configs/interfaces';
import { State } from '../../../../configs/redux/store';
import { selectAlbumToView } from '../../../../creators/albums';
import { openAlbumInfoDialog } from '../../../../creators/dialogs/album-info';

const AllAlbumsView = (props: AllAlbumsViewProps): JSX.Element => {
  const { albums, images, userIsAdmin, selectAlbumHandler, openDialogHandler } =
    props;

  return (
    <Grid container spacing={2} alignItems="center" justifyContent="center">
      <Grid item xs={12} container justifyContent="flex-end" sx={{ mt: 2 }}>
        {userIsAdmin && (
          <Button
            onClick={openDialogHandler}
            startIcon={<AddIcon />}
            variant="outlined"
          >
            {'New Album'}
          </Button>
        )}
      </Grid>
      {albums.map((album) => {
        if (album.isPrivateAlbum && !userIsAdmin) {
          return null;
        }
        return (
          <Grid key={album.id} item xs={10} sm={6} md={4} lg={3}>
            <Card sx={{ width: '100%' }}>
              <CardActionArea
                onClick={() => {
                  selectAlbumHandler(album, images);
                }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={album.coverImageDownloadURL}
                  alt={album.title}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {album.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {`${album.subtitle}: ${album.images.length} pictures`}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
};

type AllAlbumsViewProps = StateProps & DispatchProps;

interface StateProps {
  albums: AlbumVO[];
  images: ImageVO[];
  userIsAdmin: boolean;
}

interface DispatchProps {
  selectAlbumHandler: (album: AlbumVO, images: ImageVO[]) => void;
  openDialogHandler: () => void;
}

const mapStateToProps = (state: State): StateProps => {
  return {
    albums: state.applicationState.albums,
    images: state.applicationState.images,
    userIsAdmin: state.applicationState.userIsAdmin,
  };
};

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  selectAlbumHandler: (album: AlbumVO, images: ImageVO[]) => {
    dispatch(selectAlbumToView(album, images));
    dispatch(routerActions.push(AppPaths.selectedAlbum));
  },
  openDialogHandler: () => {
    dispatch(openAlbumInfoDialog());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(AllAlbumsView);
