import DownloadIcon from '@mui/icons-material/Download';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import { createStyles, makeStyles } from '@mui/styles';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { AlbumVO, ImageVO } from '../../../../../../configs/interfaces';
import { State } from '../../../../../../configs/redux/store';
import { downloadImage } from '../../../../../../utils/save-images';
import FavButton from '../fav-button/FavButton';
import SettingsMenu from '../settings-menu/SettingsMenu';

const useStyles = makeStyles(() =>
  createStyles({
    iconButton: {
      color: 'rgba(255, 255, 255, 0.54)',
    },
  })
);

const BottomFullToolbar = (props: Props): JSX.Element => {
  const classes = useStyles();
  const { image, favoriteImageIds, clearOnHoverHandler, selectedAlbum } = props;
  const [isFav, setIsFav] = useState(false);

  useEffect(() => {
    const foundIndex = favoriteImageIds.indexOf(image.id);
    setIsFav(foundIndex !== -1);
  }, [favoriteImageIds]);

  return (
    <ImageListItemBar
      position="bottom"
      sx={{
        p: 0,
        '& .MuiImageListItemBar-titleWrap': {
          p: 1,
        },
      }}
      title={
        <Grid container justifyContent="space-between">
          <Grid item>
            <FavButton isFav={isFav} imageId={image.id} />
          </Grid>
          <Grid item>
            <Grid container>
              <Grid item>
                <IconButton
                  className={classes.iconButton}
                  onClick={async (e) => {
                    e.stopPropagation();
                    await downloadImage(image);
                  }}
                >
                  <DownloadIcon />
                </IconButton>
              </Grid>
              <Grid item>
                {selectedAlbum && (
                  <SettingsMenu
                    image={image}
                    albumFirebaseId={selectedAlbum.firebaseId}
                    clearOnHoverHandler={clearOnHoverHandler}
                  />
                )}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      }
    />
  );
};

type Props = PassedInProps & StateProps;

interface PassedInProps {
  image: ImageVO;
  clearOnHoverHandler: () => void;
}

interface StateProps {
  selectedAlbum?: AlbumVO;
  favoriteImageIds: string[];
}

const mapStateToProps = (state: State): StateProps => {
  const signedInUser = state.applicationState.signedInUser;
  return {
    selectedAlbum: state.selectedAlbumState.currentAlbum,
    favoriteImageIds: signedInUser ? signedInUser.favoriteImageIds : [],
  };
};

export default connect(mapStateToProps)(BottomFullToolbar);
