import { makeStyles, createStyles } from '@mui/styles';
import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { State } from '../../../../configs/redux/store';

const useStyles = makeStyles(() => createStyles({}));

const SelectedAlbumToolbar = (
  props: SelectedAlbumToolbarProps
): JSX.Element => {
  const classes = useStyles();

  return (
    <div>
      <p>Functional Connected Component</p>
    </div>
  );
};

type SelectedAlbumToolbarProps = PassedInProps & StateProps & DispatchProps;

interface PassedInProps {
  DELETE_ME?: string;
}

interface StateProps {
  DELETE_ME?: string;
}

interface DispatchProps {
  DELETE_ME?: string;
}

const mapStateToProps = (state: State): StateProps => {
  return {};
};

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectedAlbumToolbar);
