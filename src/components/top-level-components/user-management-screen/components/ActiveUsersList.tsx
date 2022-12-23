import AddIcon from '@mui/icons-material/Add';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import PersonIcon from '@mui/icons-material/Person';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { UserVO } from '../../../../configs/interfaces/user/UserVO';
import { State } from '../../../../configs/redux/store';
import { openUserInfoDialog } from '../../../../creators/dialogs/user-info';

const ActiveUsersList = (props: ActiveUsersListProps): JSX.Element => {
  const { users, openUserDialogHandler, openEditUserDialogHandler } = props;

  return (
    <>
      <Card>
        <CardHeader
          title="Active Users"
          avatar={<AssignmentIndIcon />}
          action={
            <IconButton onClick={openUserDialogHandler}>
              <AddIcon />
            </IconButton>
          }
        />
        <CardContent>
          <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
            {users.map((user) => (
              <ListItem key={user.id}>
                <ListItemButton
                  onClick={() => {
                    openEditUserDialogHandler(user);
                  }}
                >
                  <ListItemAvatar>
                    <Avatar>
                      <PersonIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={user.username}
                    secondary={user.email}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>
    </>
  );
};

type ActiveUsersListProps = PassedInProps & StateProps & DispatchProps;

interface PassedInProps {
  DELETE_ME?: string;
}

interface StateProps {
  users: UserVO[];
}

interface DispatchProps {
  openUserDialogHandler: () => void;
  openEditUserDialogHandler: (user: UserVO) => void;
}

const mapStateToProps = (state: State): StateProps => {
  return {
    users: state.applicationState.users,
  };
};

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  openUserDialogHandler: () => {
    dispatch(openUserInfoDialog());
  },
  openEditUserDialogHandler: (user: UserVO) => {
    dispatch(openUserInfoDialog(user));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ActiveUsersList);
