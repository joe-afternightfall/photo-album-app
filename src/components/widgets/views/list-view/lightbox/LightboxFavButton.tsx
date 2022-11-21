import StarBorderIcon from '@mui/icons-material/StarBorderRounded';
import StarIcon from '@mui/icons-material/StarRounded';
import Grid from '@mui/material/Grid';
import { makeStyles, createStyles } from '@mui/styles';
import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

import { State } from '../../../../../configs/redux/store';
import { ApplicationActions } from '../../../../../creators/actions';
import {
  removeImageFromUsersFavoriteList,
  tagImageAsFavorite,
} from '../../../../../firebase/services/firebase-users-service';

const useStyles = makeStyles(() =>
  createStyles({
    star: {
      height: '100%',
      width: '32px',
      color: 'rgba(255, 255, 255, 0.8)',
      '&:hover': {
        cursor: 'pointer',
        color: 'rgba(255, 255, 255)',
      },
    },
  })
);

const LightboxFavButton = (props: LightboxFavButtonProps): JSX.Element => {
  const classes = useStyles();

  const { isFav, currentImageId, toggleFavHandler } = props;

  const handleClick = () => {
    toggleFavHandler(isFav, currentImageId);
  };

  return (
    <Grid
      container
      alignItems="center"
      direction="column"
      justifyContent="center"
    >
      <Grid item sx={{ px: 1 }}>
        {isFav ? (
          <StarIcon
            fontSize="medium"
            onClick={handleClick}
            className={classes.star}
          />
        ) : (
          <StarBorderIcon
            fontSize="medium"
            onClick={handleClick}
            className={classes.star}
          />
        )}
      </Grid>
    </Grid>
  );
};

type LightboxFavButtonProps = PassedInProps & DispatchProps;

interface PassedInProps {
  isFav: boolean;
  currentImageId: string;
}

interface DispatchProps {
  toggleFavHandler: (isFav: boolean, imageId: string) => void;
}

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  toggleFavHandler: (isFav: boolean, imageId: string) => {
    (dispatch as ThunkDispatch<State, void, ApplicationActions>)(
      isFav
        ? removeImageFromUsersFavoriteList(imageId)
        : tagImageAsFavorite(imageId)
    );
  },
});

export default connect(null, mapDispatchToProps)(LightboxFavButton);
