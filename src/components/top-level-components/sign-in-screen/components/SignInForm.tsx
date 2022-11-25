import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import React, { ChangeEvent, useState } from 'react';

import { auth } from '../../../../configs/firebase/firebase-config';

export default function SignInForm(): JSX.Element {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [helperText, setHelperText] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [emailError, setEmailError] = useState(false);

  const signIn = async () => {
    try {
      if (email !== '' && password !== '') {
        await auth.signInWithEmailAndPassword(email, password);
      }
    } catch (e) {
      const error = e as unknown as { code: string };
      console.error('firebase-error: ' + JSON.stringify(error));
      if (error.code === 'auth/user-not-found') {
        setEmailError(true);
        setPasswordError(false);
        setHelperText('email not found');
      } else if (error.code === 'auth/wrong-password') {
        setEmailError(false);
        setPasswordError(true);
        setHelperText('wrong password');
      } else if (error.code === 'auth/invalid-email') {
        setEmailError(true);
        setPasswordError(false);
        setHelperText('not a valid email');
      }
    }
  };

  const canAttemptSignIn = email !== '' && password !== '';

  return (
    <Grid container spacing={2} direction="column" alignItems="center">
      <Grid item>
        <TextField
          fullWidth
          variant={'outlined'}
          label={'email'}
          value={email}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setEmail(e.target.value);
          }}
          error={emailError}
          helperText={emailError ? helperText : ''}
        />
      </Grid>
      <Grid item>
        <TextField
          fullWidth
          variant={'outlined'}
          label={'password'}
          type={'password'}
          value={password}
          error={passwordError}
          helperText={passwordError ? helperText : ''}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
      </Grid>
      <Grid item>
        <Button
          variant={'contained'}
          onClick={signIn}
          disabled={!canAttemptSignIn}
          sx={{ minWidth: '186px' }}
        >
          {'Sign In'}
        </Button>
      </Grid>
    </Grid>
  );
}
