import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { makeStyles, createStyles } from '@mui/styles';
import clsx from 'clsx';
import React from 'react';
import { connect } from 'react-redux';

import { State } from '../../../../../configs/redux/store';

const useStyles = makeStyles(() =>
  createStyles({
    avatar: {
      width: 32,
      height: 32,
      marginRight: 8,
    },
    username: {
      fontSize: '0.9375rem',
      fontWeight: 600,
      lineHeight: 1.5,
    },
    email: {
      fontSize: '0.8125rem',
      fontWeight: 500,
      overflowWrap: 'break-word',
    },
  })
);

const ProfileHeader = (props: Props): JSX.Element => {
  const classes = useStyles();
  const { email, username } = props;

  return (
    <Grid item xs={12} container alignItems={'center'} sx={{ p: 2 }}>
      <Grid item>
        <Avatar className={clsx(classes.avatar)} />
      </Grid>
      <Grid item sx={{ ml: 1, maxWidth: '200px' }}>
        <Grid item xs={12}>
          <Typography className={classes.username} variant={'h6'}>
            {username}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography className={classes.email} color={'textSecondary'}>
            {email}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};

type Props = StateProps;

interface StateProps {
  email: string;
  username: string;
}

const mapStateToProps = (state: State): StateProps => {
  const signedInUser = state.applicationState.signedInUser;
  let username = '';
  let email = '';
  if (signedInUser) {
    username = signedInUser.username;
    email = signedInUser.email;
  }

  return {
    email,
    username,
  };
};

export default connect(mapStateToProps)(ProfileHeader);
