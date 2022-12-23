import { TextField } from '@mui/material';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import Grid from '@mui/material/Grid';
import { makeStyles, createStyles } from '@mui/styles';
import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { UserVO } from '../../../../configs/interfaces/user/UserVO';
import { State } from '../../../../configs/redux/store';
import { closeUserInfoDialog } from '../../../../creators/dialogs/user-info';
import BaseDialog from '../../../shared/dialog/BaseDialog';

const useStyles = makeStyles(() => createStyles({}));

const UserInfoDialog = (props: UserInfoDialogProps): JSX.Element => {
  const classes = useStyles();

  const { open, user, closeHandler } = props;

  return (
    <BaseDialog
      open={open}
      data-testid="user-info-dialog"
      title={user ? 'Update User' : 'New User'}
      closeDialogHandler={closeHandler}
      dialogContent={
        <Grid container>
          <Grid item xs={12}>
            <TextField label="Email" />
          </Grid>
          <Grid item xs={12}>
            <TextField label="Username" />
          </Grid>
        </Grid>
      }
      dialogActions={
        <DialogActions>
          <Button onClick={closeHandler}>{'Cancel'}</Button>
          <Button>{'Create'}</Button>
        </DialogActions>
      }
    />
  );
};

type UserInfoDialogProps = StateProps & DispatchProps;

interface StateProps {
  open: boolean;
  user?: UserVO;
}

interface DispatchProps {
  closeHandler: () => void;
}

const mapStateToProps = (state: State): StateProps => {
  const userInfoDialog = state.appDialogState.userInfoDialog;

  return {
    open: userInfoDialog.display,
    user: userInfoDialog.selectedUser,
  };
};

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  closeHandler: () => {
    dispatch(closeUserInfoDialog());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(UserInfoDialog);
