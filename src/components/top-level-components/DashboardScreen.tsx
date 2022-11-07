import { makeStyles, createStyles } from '@mui/styles';
import React from 'react';

const useStyles = makeStyles(() => createStyles({}));

export default function DashboardScreen(): JSX.Element {
  const classes = useStyles();

  return (
    <div>
      <p>Dashboard page</p>
    </div>
  );
}
