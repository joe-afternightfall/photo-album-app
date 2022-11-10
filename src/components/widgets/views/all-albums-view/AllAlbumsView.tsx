import { CardActionArea, CardMedia } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Grid from '@mui/material/Grid';
import { routerActions } from 'connected-react-router';
import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { AppPaths } from '../../../../configs/app-settings/app-routes';
import { AlbumVO } from '../../../../configs/interfaces';
import { State } from '../../../../configs/redux/store';
import { selectAlbumToView } from '../../../../creators/albums';
import BasicMenu from './toss';

const AllAlbumsView = (props: AllAlbumsViewProps): JSX.Element => {
  const { albums, selectAlbumHandler } = props;

  return (
    <Grid container spacing={2} alignItems="center" justifyContent="center">
      {albums.map((album) => (
        <Grid key={album.id} item xs={10} sm={4} md={3}>
          <Card sx={{ width: '100%' }}>
            <CardHeader
              title={album.title}
              subheader={album.subtitle}
              action={<BasicMenu />}
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
});

export default connect(mapStateToProps, mapDispatchToProps)(AllAlbumsView);
