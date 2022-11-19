import { makeStyles, createStyles } from '@mui/styles';
import React from 'react';

import NewUsersRequestsList from './components/NewUserRequestsList';

const useStyles = makeStyles(() => createStyles({}));

export default function UserManagementScreen(): JSX.Element {
  const classes = useStyles();

  return (
    <div>
      <NewUsersRequestsList />
    </div>
  );
}
