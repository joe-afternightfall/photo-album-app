import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import React, { ChangeEvent, useState } from 'react';

import { submitRequest } from '../../../../firebase/services/request-access';

export default function RequestAccessForm(): JSX.Element {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const canAttemptSubmit = email !== '' && name !== '';

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
        />
      </Grid>
      <Grid item>
        <TextField
          fullWidth
          variant={'outlined'}
          label={'name'}
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
      </Grid>
      <Grid item>
        <Button
          sx={{ minWidth: '186px' }}
          disabled={!canAttemptSubmit}
          onClick={async () => {
            await submitRequest(name, email);
          }}
        >
          {'Submit'}
        </Button>
      </Grid>
    </Grid>
  );
}
