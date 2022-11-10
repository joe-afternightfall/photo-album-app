import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import { routerActions } from 'connected-react-router';
import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { AppPaths } from '../../../../configs/app-settings/app-routes';
import { AlbumVO } from '../../../../configs/interfaces';
import { State } from '../../../../configs/redux/store';
import { selectAlbumToView } from '../../../../creators/albums';
import { openAlbumInfoDialog } from '../../../../creators/dialogs/album-info';
import AlbumActionMenu from './AlbumActionMenu';

const AllAlbumsView = (props: AllAlbumsViewProps): JSX.Element => {
  const { albums, selectAlbumHandler, openDialogHandler } = props;

  return (
    <Grid container spacing={2} alignItems="center" justifyContent="center">
      <Grid item xs={12} container justifyContent="flex-end" sx={{ mt: 2 }}>
        <Button
          onClick={openDialogHandler}
          startIcon={<AddIcon />}
          variant="outlined"
        >
          {'New Album'}
        </Button>
      </Grid>
      {albums.map((album) => (
        <Grid key={album.id} item xs={10} sm={4} md={3}>
          <Card sx={{ width: '100%' }}>
            <CardHeader
              title={album.title}
              subheader={album.subtitle}
              action={<AlbumActionMenu album={album} />}
            />
            <CardActionArea
              onClick={() => {
                selectAlbumHandler(album);
              }}
            >
              <CardMedia
                component="img"
                height="140"
                image="/0001.JPG"
                alt="green iguana"
              />
              <CardContent />
            </CardActionArea>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

type AllAlbumsViewProps = StateProps & DispatchProps;

interface StateProps {
  albums: AlbumVO[];
}

interface DispatchProps {
  selectAlbumHandler: (album: AlbumVO) => void;
  openDialogHandler: () => void;
}

const mapStateToProps = (state: State): StateProps => {
  return {
    albums: state.applicationState.albums,
  };
};

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  selectAlbumHandler: (album: AlbumVO) => {
    dispatch(selectAlbumToView(album));
    dispatch(routerActions.push(AppPaths.selectedAlbum));
  },
  openDialogHandler: () => {
    dispatch(openAlbumInfoDialog());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(AllAlbumsView);
