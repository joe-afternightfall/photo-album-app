import { useMediaQuery } from '@mui/material';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { useTheme } from '@mui/material/styles';
import React, { ChangeEvent, useState } from 'react';

import { auth } from '../../../configs/firebase/firebase-config';

export default function SignInScreen(): JSX.Element {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [helperText, setHelperText] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'));

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
    <Grid container alignItems="center" justifyContent="center">
      <Grid
        item
        xs={10}
        sm={8}
        md={6}
        alignItems="center"
        justifyContent="center"
      >
        <Grid
          item
          sx={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate3d(-50%, -50%, 0)',
          }}
        >
          <Card sx={{ minWidth: isMd ? '400px' : '300px', py: 8 }}>
            <CardContent sx={{ px: 0 }}>
              <Grid
                container
                spacing={2}
                direction="column"
                alignItems="center"
              >
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
        </Grid>
      </Grid>
    </Grid>
  );
}
