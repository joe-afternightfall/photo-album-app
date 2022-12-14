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

import { AlbumVO } from '../../../../../configs/interfaces';
import { State } from '../../../../../configs/redux/store';
import { ApplicationActions } from '../../../../../creators/actions';
import { displayFavorites } from '../../../../../creators/selected-album/favorites';
import { getNumberOfFavorites } from '../../../../../utils/string-formatter';
import { zipAndSaveSelectedAlbumFavorites } from '../../../../../utils/zip-images';
import AdminMenuItems from './AdminMenuItems';

const AlbumActionMenu = (props: Props): JSX.Element => {
  const {
    currentAlbum,
    userIsAdmin,
    numberOfFavorites,
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
            disabled={numberOfFavorites === 0}
          >
            <ListItemIcon>
              <StarIcon />
            </ListItemIcon>
            <ListItemText>{`Show Favorites  (${numberOfFavorites})`}</ListItemText>
          </MenuItem>
          <MenuItem
            onClick={() => {
              downloadFavoritesHandler();
              handleClose();
            }}
            disabled={numberOfFavorites === 0}
          >
            <ListItemIcon>
              <DownloadIcon />
            </ListItemIcon>
            <ListItemText>{'Download Favorites'}</ListItemText>
          </MenuItem>
          <Divider />
          {userIsAdmin && currentAlbum && (
            <AdminMenuItems
              currentAlbum={currentAlbum}
              closeHandler={handleClose}
            />
          )}
        </MenuList>
      </Menu>
    </React.Fragment>
  );
};

type Props = StateProps & DispatchProps;

interface StateProps {
  numberOfFavorites: number;
  userIsAdmin: boolean;
  currentAlbum?: AlbumVO;
}

interface DispatchProps {
  displayFavoritesHandler: () => void;
  downloadFavoritesHandler: () => void;
}

const mapStateToProps = (state: State): StateProps => {
  const signedInUser = state.applicationState.signedInUser;
  const currentAlbum = state.selectedAlbumState.currentAlbum;
  let numberOfFavorites = 0;

  if (signedInUser && currentAlbum) {
    const favoriteImageIds = signedInUser.favoriteImageIds;
    numberOfFavorites = getNumberOfFavorites(currentAlbum, favoriteImageIds);
  }

  return {
    currentAlbum,
    numberOfFavorites,
    userIsAdmin: state.applicationState.userIsAdmin,
  };
};

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  displayFavoritesHandler: () => {
    dispatch(displayFavorites());
  },
  downloadFavoritesHandler: () => {
    (dispatch as ThunkDispatch<State, void, ApplicationActions>)(
      zipAndSaveSelectedAlbumFavorites()
    );
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(AlbumActionMenu);
