import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { AlbumVO } from '../../../../configs/interfaces';
import { openAlbumInfoDialog } from '../../../../creators/dialogs/album-info';

const AlbumActionMenu = (props: AlbumActionMenuProps): JSX.Element => {
  const { openDialogHandler } = props;
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const openMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const closeMenu = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton onClick={openMenu}>
        <MoreVertIcon />
      </IconButton>
      <Menu
        // id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={closeMenu}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem
          onClick={() => {
            closeMenu();
            openDialogHandler();
          }}
          sx={{ width: '150px' }}
        >
          <EditIcon sx={{ mr: 2 }} />
          {'Edit'}
        </MenuItem>
        <MenuItem onClick={closeMenu}>
          <DeleteIcon sx={{ mr: 2 }} />
          {'Delete'}
        </MenuItem>
      </Menu>
    </div>
  );
};

type AlbumActionMenuProps = PassedInProps & DispatchProps;

interface PassedInProps {
  album: AlbumVO;
}

interface DispatchProps {
  openDialogHandler: () => void;
}

const mapDispatchToProps = (
  dispatch: Dispatch,
  ownProps: PassedInProps
): DispatchProps => ({
  openDialogHandler: () => {
    dispatch(openAlbumInfoDialog(ownProps.album));
  },
});

export default connect(null, mapDispatchToProps)(AlbumActionMenu);
