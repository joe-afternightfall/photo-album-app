import CircularProgress from '@mui/material/CircularProgress';
import Dialog from '@mui/material/Dialog';
import React from 'react';
import { connect } from 'react-redux';

import { State } from '../../../configs/redux/store';

const AppLoader = (props: AppLoaderProps): JSX.Element => {
  const { open } = props;

  return (
    <Dialog open={open} PaperProps={{ sx: { background: 'none' } }}>
      <CircularProgress data-testid="circular-app-loader" color="primary" />
    </Dialog>
  );
};

interface AppLoaderProps {
  open: boolean;
}

const mapStateToProps = (state: State): AppLoaderProps => {
  return {
    open: state.applicationState.displayAppLoader,
  };
};

export default connect(mapStateToProps)(AppLoader);
