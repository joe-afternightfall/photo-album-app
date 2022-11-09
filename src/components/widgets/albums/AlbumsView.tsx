import { CardActionArea, CardMedia } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Grid from '@mui/material/Grid';
import { makeStyles, createStyles } from '@mui/styles';
import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { AlbumVO } from '../../../configs/interfaces';
import { State } from '../../../configs/redux/store';

const useStyles = makeStyles(() => createStyles({}));

const AlbumsView = (props: AlbumsViewProps): JSX.Element => {
  const classes = useStyles();
  const { albums } = props;

  return (
    <Grid container spacing={2}>
      {albums.map((album) => (
        <Grid key={album.id} item xs={6} sm={4} md={3}>
          <Card sx={{ width: '100%' }}>
            <CardActionArea>
              <CardHeader title={album.title} subheader={album.subtitle} />
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

type AlbumsViewProps = PassedInProps & StateProps & DispatchProps;

interface PassedInProps {
  DELETE_ME?: string;
}

interface StateProps {
  albums: AlbumVO[];
}

interface DispatchProps {
  DELETE_ME?: string;
}

const mapStateToProps = (state: State): StateProps => {
  return {
    albums: state.applicationState.albums,
  };
};

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({});

export default connect(mapStateToProps, mapDispatchToProps)(AlbumsView);
