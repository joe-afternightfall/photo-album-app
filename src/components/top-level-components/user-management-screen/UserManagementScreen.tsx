import React from 'react';

import ActiveUsersList from './components/ActiveUsersList';
import NewUsersRequestsList from './components/NewUserRequestsList';

export default function UserManagementScreen(): JSX.Element {
  return (
    <div>
      <NewUsersRequestsList />
      <ActiveUsersList />
    </div>
  );
}
