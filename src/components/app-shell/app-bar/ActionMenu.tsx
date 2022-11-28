import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DownloadIcon from '@mui/icons-material/Download';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import StarIcon from '@mui/icons-material/StarRounded';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Tooltip from '@mui/material/Tooltip';
import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

import { State } from '../../../configs/redux/store';
import { ApplicationActions } from '../../../creators/actions';
import { openUploadImagesDialog } from '../../../creators/dialogs/upload-images';
import { displayFavorites } from '../../../creators/selected-album/favorites';
import { zipAndSaveSelectedAlbumFavorites } from '../../../utils/zip-images';

const ActionMenu = (props: ActionMenuProps): JSX.Element => {
  const {
    openUploadDialogHandler,
    downloadFavoritesHandler,
    displayFavoritesHandler,
  } = props;
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
        <MenuList>
          <MenuItem
            onClick={() => {
              displayFavoritesHandler();
              handleClose();
            }}
          >
            {/*todo: display number of favorites for user*/}
            <ListItemIcon>
              <StarIcon />
            </ListItemIcon>
            <ListItemText>{`Show Favorites`}</ListItemText>
          </MenuItem>
          <MenuItem
            onClick={() => {
              downloadFavoritesHandler();
              handleClose();
            }}
          >
            <ListItemIcon>
              <DownloadIcon />
            </ListItemIcon>
            {/*todo: disable download if no favorites for album*/}
            <ListItemText>{'Download Favorites'}</ListItemText>
          </MenuItem>
          <Divider />
          <MenuItem
            onClick={() => {
              openUploadDialogHandler();
              handleClose();
            }}
          >
            <ListItemIcon>
              <CloudUploadIcon />
            </ListItemIcon>
            <ListItemText>{'Upload Images'}</ListItemText>
          </MenuItem>
        </MenuList>
      </Menu>
    </React.Fragment>
  );
};

type ActionMenuProps = DispatchProps;

interface DispatchProps {
  displayFavoritesHandler: () => void;
  openUploadDialogHandler: () => void;
  downloadFavoritesHandler: () => void;
}

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  displayFavoritesHandler: () => {
    dispatch(displayFavorites());
  },
  openUploadDialogHandler: () => {
    dispatch(openUploadImagesDialog());
  },
  downloadFavoritesHandler: () => {
    (dispatch as ThunkDispatch<State, void, ApplicationActions>)(
      zipAndSaveSelectedAlbumFavorites()
    );
  },
});

export default connect(null, mapDispatchToProps)(ActionMenu);
