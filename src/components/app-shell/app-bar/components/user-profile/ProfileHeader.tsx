import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { makeStyles, createStyles } from '@mui/styles';
import clsx from 'clsx';
import React from 'react';

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

export default function ProfileHeader(): JSX.Element {
  const classes = useStyles();

  return (
    <Grid item xs={12} container alignItems={'center'} sx={{ p: 2 }}>
      <Grid item>
        <Avatar className={clsx(classes.avatar)} />
      </Grid>
      <Grid item sx={{ ml: 1 }}>
        <Grid item xs={12}>
          <Typography className={classes.username} variant={'h6'}>
            {'John Smith'}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography className={classes.email} color={'textSecondary'}>
            {'r70bsdrummer@example.com'}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
}
