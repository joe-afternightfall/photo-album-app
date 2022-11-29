import CollectionsIcon from '@mui/icons-material/Collections';
import GroupIcon from '@mui/icons-material/Group';
import MenuIcon from '@mui/icons-material/Menu';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import { routerActions } from 'connected-react-router';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { AppPaths } from '../../../configs/app-settings/app-routes';
import { State } from '../../../configs/redux/store';

const AppSideDrawer = (props: AppSideDrawerProps): JSX.Element => {
  const { userIsAdmin, routeToUsersHandler, routeToAllAlbumsHandler } = props;
  const [open, setOpen] = useState(false);

  const openDrawer = () => {
    setOpen(true);
  };

  const closeDrawer = () => {
    setOpen(false);
  };

  return (
    <>
      <IconButton
        color="inherit"
        edge="start"
        sx={{
          mr: 2,
        }}
        onClick={openDrawer}
      >
        <MenuIcon />
      </IconButton>
      <Drawer
        variant="temporary"
        open={open}
        onClose={closeDrawer}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
      >
        <div>
          <Toolbar />
          <Divider />
          <List>
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => {
                  closeDrawer();
                  routeToAllAlbumsHandler();
                }}
              >
                <ListItemIcon>
                  <CollectionsIcon />
                </ListItemIcon>
                <ListItemText primary="All Albums" />
              </ListItemButton>
            </ListItem>
            {userIsAdmin && (
              <ListItem disablePadding>
                <ListItemButton
                  onClick={() => {
                    closeDrawer();
                    routeToUsersHandler();
                  }}
                >
                  <ListItemIcon>
                    <GroupIcon />
                  </ListItemIcon>
                  <ListItemText primary="User Management" />
                </ListItemButton>
              </ListItem>
            )}
          </List>
        </div>
      </Drawer>
    </>
  );
};

type AppSideDrawerProps = StateProps & DispatchProps;

interface StateProps {
  userIsAdmin: boolean;
}

interface DispatchProps {
  routeToAllAlbumsHandler: () => void;
  routeToUsersHandler: () => void;
}

const mapStateToProps = (state: State): StateProps => {
  return {
    userIsAdmin: state.applicationState.userIsAdmin,
  };
};

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  routeToAllAlbumsHandler: () => {
    dispatch(routerActions.push(AppPaths.dashboard));
  },
  routeToUsersHandler: () => {
    dispatch(routerActions.push(AppPaths.manageUsers));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(AppSideDrawer);
