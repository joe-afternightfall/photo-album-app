import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { State } from '../../../configs/redux/store';
import { AppSnackbarProps as SnackbarProps } from '../../../creators/app-snackbar';
import { hideAppSnackbar } from '../../../creators/app-snackbar';

const AppSnackbar = (props: AppSnackbarProps): JSX.Element => {
  const snackbarProps = props.snackbarProps;

  const handleClose = (
    event?: Event | React.SyntheticEvent,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }
    props.handleClose();
  };

  return (
    <Snackbar
      onClose={handleClose}
      autoHideDuration={3000}
      open={props.open}
      anchorOrigin={{
        vertical: snackbarProps.position.vertical,
        horizontal: snackbarProps.position.horizontal,
      }}
    >
      <Alert
        // elevation={6}
        variant={'filled'}
        onClose={handleClose}
        severity={snackbarProps.severity}
        sx={{ width: '100%' }}
      >
        {snackbarProps.message}
      </Alert>
    </Snackbar>
  );
};

export interface AppSnackbarProps {
  open: boolean;
  snackbarProps: SnackbarProps;
  handleClose: () => void;
}

const mapStateToProps = (state: State): AppSnackbarProps => {
  return {
    open: state.applicationState.displayAppSnackbar,
    snackbarProps: state.applicationState.snackbarProps,
  } as unknown as AppSnackbarProps;
};

const mapDispatchToProps = (dispatch: Dispatch): AppSnackbarProps =>
  ({
    handleClose: () => {
      dispatch(hideAppSnackbar());
    },
  } as unknown as AppSnackbarProps);

export default connect(mapStateToProps, mapDispatchToProps)(AppSnackbar);
