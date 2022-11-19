import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { makeStyles, createStyles } from '@mui/styles';
import { getAuth, sendSignInLinkToEmail } from 'firebase/auth';
import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { State } from '../../../../configs/redux/store';
import BaseDialog from '../../../shared/dialog/BaseDialog';

const useStyles = makeStyles(() => createStyles({}));

const NewUserDialog = (props: NewUserDialogProps): JSX.Element => {
  const classes = useStyles();
  const { open, name, email, closeDialogHandler } = props;

  const actionCodeSettings = {
    // URL you want to redirect back to. The domain (www.example.com) for this
    // URL must be in the authorized domains list in the Firebase Console.
    url: 'https://yarbro-photo-album.firebaseapp.com',
    // This must be true.
    handleCodeInApp: true,
    // iOS: {
    //   bundleId: 'com.example.ios',
    // },
    // android: {
    //   packageName: 'com.example.android',
    //   installApp: true,
    //   minimumVersion: '12',
    // },
    // dynamicLinkDomain: 'example.page.link',
  };

  const handleConfirmClick = () => {
    const auth = getAuth();
    sendSignInLinkToEmail(auth, email, actionCodeSettings)
      .then(() => {
        // The link was successfully sent. Inform the user.
        // Save the email locally so you don't need to ask the user for it again
        // if they open the link on the same device.
        window.localStorage.setItem('emailForSignIn', email);
        // ...
      })
      .catch((error) => {
        console.log('error: ' + JSON.stringify(error));
        const errorCode = error.code;
        const errorMessage = error.message;
        // ...
      });
  };

  return (
    <BaseDialog
      open={open}
      data-testid="new-user-dialog"
      title="New User"
      closeDialogHandler={closeDialogHandler}
      dialogContent={
        <Grid container>
          <Grid item xs={12}>
            <Typography>{'User: ' + name}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography>{'Email: ' + email}</Typography>
          </Grid>
        </Grid>
      }
      dialogActions={
        <DialogActions>
          <Button onClick={closeDialogHandler}>{'Cancel'}</Button>
          <Button onClick={handleConfirmClick}>{'Send Email'}</Button>
        </DialogActions>
      }
    />
  );
};

type NewUserDialogProps = PassedInProps & StateProps & DispatchProps;

interface PassedInProps {
  open: boolean;
  name: string;
  email: string;
  closeDialogHandler: () => void;
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

export default connect(mapStateToProps, mapDispatchToProps)(NewUserDialog);
