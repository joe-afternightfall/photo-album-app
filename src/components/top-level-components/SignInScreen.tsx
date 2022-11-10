import { FirebaseError } from '@firebase/util';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import React, { ChangeEvent, useState } from 'react';

import { auth } from '../../configs/firebase/firebase-config';

export default function SignInScreen(): JSX.Element {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [helperText, setHelperText] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [emailError, setEmailError] = useState(false);

  // const createAccount = async () => {
  //   try {
  //     if (emailRef.current && passwordRef.current) {
  //       await auth.createUserWithEmailAndPassword(
  //         emailRef.current.value,
  //         passwordRef.current.value
  //       );
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const signIn = async () => {
    try {
      if (email !== '' && password !== '') {
        const userCredential = await auth.signInWithEmailAndPassword(
          email,
          password
        );
      }
    } catch (e) {
      const error = e as FirebaseError;
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
    <div style={{ height: '400px' }}>
      <Card>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
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
            <Grid item xs={12}>
              <TextField
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
          </Grid>
        </CardContent>
        <CardActions>
          <Button
            variant={'contained'}
            sx={{ m: 'auto' }}
            onClick={signIn}
            disabled={!canAttemptSignIn}
          >
            {'Sign In'}
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}
