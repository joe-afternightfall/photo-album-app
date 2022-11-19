import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { makeStyles, createStyles } from '@mui/styles';
import React, { ChangeEvent, useState } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { State } from '../../../../configs/redux/store';
import { submitRequest } from '../../../../firebase/services/request-access';

const useStyles = makeStyles(() => createStyles({}));

const RequestAccessForm = (props: RequestAccessFormProps): JSX.Element => {
  const classes = useStyles();
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
};

type RequestAccessFormProps = PassedInProps & StateProps & DispatchProps;

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

export default connect(mapStateToProps, mapDispatchToProps)(RequestAccessForm);
