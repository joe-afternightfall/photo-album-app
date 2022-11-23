import Grid from '@mui/material/Grid';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { State } from '../../../../../../configs/redux/store';
import FavButton from '../fav-button/FavButton';

const BottomFavToolbar = (props: Props): JSX.Element => {
  const { imageId, favoriteImageIds } = props;
  const [isFav, setIsFav] = useState(false);

  useEffect(() => {
    const foundIndex = favoriteImageIds.indexOf(imageId);
    setIsFav(foundIndex !== -1);
  }, [favoriteImageIds]);

  return (
    <ImageListItemBar
      position="bottom"
      sx={{
        p: 0,
        background: 'inherit',
        '& .MuiImageListItemBar-titleWrap': {
          p: 1,
        },
        display: isFav ? 'block' : 'none',
      }}
      title={
        <Grid container justifyContent="space-between">
          <Grid item>
            <FavButton isFav={isFav} imageId={imageId} />
          </Grid>
        </Grid>
      }
    />
  );
};

type Props = PassedInProps & StateProps;

interface PassedInProps {
  imageId: string;
}

interface StateProps {
  favoriteImageIds: string[];
}

const mapStateToProps = (state: State): StateProps => {
  const signedInUser = state.applicationState.signedInUser;
  return {
    favoriteImageIds: signedInUser ? signedInUser.favoriteImageIds : [],
  };
};

export default connect(mapStateToProps)(BottomFavToolbar);
