import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Grid from '@mui/material/Grid';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import * as emailValidator from 'email-validator';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { UserVO } from '../../../../configs/interfaces/user/UserVO';
import { State } from '../../../../configs/redux/store';
import { closeUserInfoDialog } from '../../../../creators/dialogs/user-info';
import BaseDialog from '../../../shared/dialog/BaseDialog';

const UserInfoDialog = (props: UserInfoDialogProps): JSX.Element => {
  const { open, user, closeHandler } = props;

  const [isValidEmail, setIsValidEmail] = useState(false);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [userIsAdmin, setUserIsAdmin] = useState(false);
  const [dialogTitle, setDialogTitle] = useState('');
  const [primaryActionTitle, setPrimaryActionTitle] = useState('');

  const validateEmail = (value: string) => {
    setIsValidEmail(emailValidator.validate(value));
  };

  useEffect(() => {
    if (open) {
      if (user) {
        validateEmail(user.email);
        setEmail(user.email);
        setUsername(user.username);
        setUserIsAdmin(user.isAdmin);
        setDialogTitle('Update User Info');
        setPrimaryActionTitle('Update');
      } else {
        setIsValidEmail(false);
        setUserIsAdmin(false);
        setDialogTitle('Create New User');
        setPrimaryActionTitle('Create');
      }
    } else {
      setTimeout(() => {
        setEmail('');
        setUsername('');
        setIsValidEmail(false);
        setUserIsAdmin(false);
      }, 350);
    }
  }, [open]);

  const changeHandler = (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    if (e.target.name === 'username') {
      setUsername(e.target.value);
    } else {
      setEmail(e.target.value);
    }
  };

  return (
    <BaseDialog
      open={open}
      data-testid="user-info-dialog"
      title={dialogTitle}
      closeDialogHandler={closeHandler}
      dialogContent={
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={12}>
            <TextField
              name="email"
              label="Email"
              fullWidth
              value={email}
              onChange={(e) => {
                validateEmail(e.target.value);
                changeHandler(e);
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="username"
              label="Name"
              fullWidth
              value={username}
              onChange={changeHandler}
            />
          </Grid>
          <Grid
            item
            xs={12}
            container
            spacing={4}
            alignItems="center"
            justifyContent="center"
          >
            <Grid item>
              <Typography>{'Grant Admin Privileges:'}</Typography>
            </Grid>
            <Grid item>
              <FormControl>
                <FormLabel id="admin-buttons-group-label">{'Admin'}</FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="admin-buttons-group-label"
                  name="admin-buttons-group"
                  onChange={(e, v) => {
                    if (v === 'yes') {
                      setUserIsAdmin(true);
                    } else {
                      setUserIsAdmin(false);
                    }
                  }}
                >
                  <FormControlLabel
                    value="yes"
                    control={<Radio checked={userIsAdmin} />}
                    label="Yes"
                  />
                  <FormControlLabel
                    value="no"
                    control={<Radio checked={!userIsAdmin} />}
                    label="No"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
          </Grid>
        </Grid>
      }
      dialogActions={
        <DialogActions>
          <Button onClick={closeHandler}>{'Cancel'}</Button>
          <Button disabled={!isValidEmail || username === ''}>
            {primaryActionTitle}
          </Button>
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
