import StarBorderIcon from '@mui/icons-material/StarBorderRounded';
import StarIcon from '@mui/icons-material/StarRounded';
import IconButton from '@mui/material/IconButton';
import { makeStyles, createStyles } from '@mui/styles';
import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

import { State } from '../../../../../../configs/redux/store';
import { ApplicationActions } from '../../../../../../creators/actions';
import {
  removeImageFromUsersFavoriteList,
  tagImageAsFavorite,
} from '../../../../../../firebase/services/firebase-users-service';

const useStyles = makeStyles(() =>
  createStyles({
    iconButton: {
      color: 'rgba(255, 255, 255, 0.54)',
    },
  })
);

const FavButton = (props: Props): JSX.Element => {
  const classes = useStyles();
  const { isFav, toggleFavHandler } = props;

  return (
    <IconButton
      className={classes.iconButton}
      onClick={(e) => {
        e.stopPropagation();
        toggleFavHandler(isFav);
      }}
    >
      {isFav ? <StarIcon /> : <StarBorderIcon />}
    </IconButton>
  );
};

type Props = PassedInProps & DispatchProps;

interface PassedInProps {
  isFav: boolean;
  imageId: string;
}

interface DispatchProps {
  toggleFavHandler: (isFav: boolean) => void;
}

const mapDispatchToProps = (
  dispatch: Dispatch,
  ownProps: PassedInProps
): DispatchProps => ({
  toggleFavHandler: (isFav: boolean) => {
    (dispatch as ThunkDispatch<State, void, ApplicationActions>)(
      isFav
        ? removeImageFromUsersFavoriteList(ownProps.imageId)
        : tagImageAsFavorite(ownProps.imageId)
    );
  },
});

export default connect(null, mapDispatchToProps)(FavButton);
