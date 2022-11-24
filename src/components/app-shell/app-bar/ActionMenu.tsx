import DownloadIcon from '@mui/icons-material/Download';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import StarIcon from '@mui/icons-material/StarRounded';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { State } from '../../../configs/redux/store';
import { displayFavorites } from '../../../creators/selected-album/favorites';

const ActionMenu = (props: ActionMenuProps): JSX.Element => {
  const { displayFavoritesHandler } = props;
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Tooltip title="Account settings">
          <IconButton onClick={handleClick} sx={{ ml: 2 }}>
            <MoreVertIcon fontSize="medium" />
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        PaperProps={{
          sx: {
            minWidth: 280,
          },
        }}
      >
        <MenuItem
          onClick={() => {
            displayFavoritesHandler();
            handleClose();
          }}
        >
          <ListItemIcon>
            <StarIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>{`Show Favorites`}</ListItemText>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <DownloadIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>{'Download Favorites'}</ListItemText>
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
};

type ActionMenuProps = PassedInProps & StateProps & DispatchProps;

interface PassedInProps {
  DELETE_ME?: string;
}

interface StateProps {
  numberOfFavorites?: number;
}

interface DispatchProps {
  displayFavoritesHandler: () => void;
}

const mapStateToProps = (state: State): StateProps => {
  return {};
};

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  displayFavoritesHandler: () => {
    dispatch(displayFavorites());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ActionMenu);
