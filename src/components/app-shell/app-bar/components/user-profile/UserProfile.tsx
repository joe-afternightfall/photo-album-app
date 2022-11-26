import Logout from '@mui/icons-material/Logout';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import React from 'react';
import { connect } from 'react-redux';

import { auth } from '../../../../../configs/firebase/firebase-config';
import { State } from '../../../../../configs/redux/store';
import { getUserInitials } from '../../../../../utils/string-formatter';
import ProfileHeader from './ProfileHeader';

const UserProfile = (props: UserProfileProps): JSX.Element => {
  const { userInitials } = props;
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const signOut = async () => {
    window.location.replace('/');
    await auth.signOut();
  };

  return (
    <>
      <Tooltip title="User Profile">
        <IconButton onClick={handleClick} size="small">
          <Avatar>{userInitials}</Avatar>
        </IconButton>
      </Tooltip>
      <Menu
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        onClick={handleClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <ProfileHeader />
        <Divider />
        <MenuItem onClick={signOut}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </>
  );
};

type UserProfileProps = StateProps;

interface StateProps {
  userInitials: string;
}

const mapStateToProps = (state: State): StateProps => {
  const signedInUser = state.applicationState.signedInUser;
  let userInitials = '';
  if (signedInUser) {
    userInitials = getUserInitials(signedInUser.username);
  }

  return {
    userInitials,
  };
};

export default connect(mapStateToProps)(UserProfile);
