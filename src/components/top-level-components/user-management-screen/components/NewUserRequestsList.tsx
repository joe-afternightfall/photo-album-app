import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import AccountCircleIcon from '@mui/icons-material/PersonAddAlt';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import React, { useState } from 'react';
import { connect } from 'react-redux';

import { AccessRequestVO } from '../../../../configs/interfaces/access-request/AccessRequestVO';
import { State } from '../../../../configs/redux/store';
import NewUserDialog from '../../../widgets/dialogs/new-user-dialog/NewUserDialog';

const NewUsersRequestsList = (
  props: NewUsersRequestsListProps
): JSX.Element => {
  const { requests } = props;
  const [open, setOpenDialog] = useState(false);
  const [selectedName, setSelectedName] = useState('');
  const [selectedEmail, setSelectedEmail] = useState('');

  const openDialog = (name: string, email: string) => {
    setSelectedName(name);
    setSelectedEmail(email);
    setOpenDialog(true);
  };

  const closeDialog = () => {
    setOpenDialog(false);
    setSelectedEmail('');
    setSelectedName('');
  };

  return (
    <>
      <Card>
        <CardHeader title="New User Requests" avatar={<AssignmentIndIcon />} />
        <CardContent>
          <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
            {requests.map((request) => (
              <ListItem key={request.id}>
                <ListItemButton
                  onClick={() => {
                    openDialog(request.name, request.email);
                  }}
                >
                  <ListItemAvatar>
                    <Avatar>
                      <AccountCircleIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={request.name}
                    secondary={request.email}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>
      <NewUserDialog
        open={open}
        name={selectedName}
        email={selectedEmail}
        closeDialogHandler={closeDialog}
      />
    </>
  );
};

type NewUsersRequestsListProps = StateProps;

interface StateProps {
  requests: AccessRequestVO[];
}

const mapStateToProps = (state: State): StateProps => {
  return {
    requests: state.applicationState.newUserRequests,
  };
};

export default connect(mapStateToProps)(NewUsersRequestsList);
