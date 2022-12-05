import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { AlbumVO } from '../../../../../configs/interfaces';
import {
  openAlbumInfoDialog,
  openDeleteAlbumDialog,
} from '../../../../../creators/dialogs/album-info';
import { openUploadImagesDialog } from '../../../../../creators/dialogs/upload-images';

const AdminMenuItems = (props: AdminMenuItemsProps): JSX.Element => {
  const {
    openUploadDialogHandler,
    openEditAlbumDialogHandler,
    openDeleteAlbumDialogHandler,
    closeHandler,
  } = props;

  return (
    <>
      <MenuItem
        onClick={() => {
          openUploadDialogHandler();
          closeHandler();
        }}
      >
        <ListItemIcon>
          <CloudUploadIcon />
        </ListItemIcon>
        <ListItemText>{'Upload Images'}</ListItemText>
      </MenuItem>
      <MenuItem
        onClick={() => {
          openEditAlbumDialogHandler();
          closeHandler();
        }}
      >
        <ListItemIcon>
          <EditIcon />
        </ListItemIcon>
        <ListItemText>{'Edit Album'}</ListItemText>
      </MenuItem>
      <MenuItem
        onClick={() => {
          openDeleteAlbumDialogHandler();
          closeHandler();
        }}
      >
        <ListItemIcon>
          <DeleteIcon />
        </ListItemIcon>
        <ListItemText>{'Delete Album'}</ListItemText>
      </MenuItem>
    </>
  );
};

type AdminMenuItemsProps = PassedInProps & DispatchProps;

interface PassedInProps {
  closeHandler: () => void;
  currentAlbum: AlbumVO;
}

interface DispatchProps {
  openUploadDialogHandler: () => void;
  openEditAlbumDialogHandler: () => void;
  openDeleteAlbumDialogHandler: () => void;
}

const mapDispatchToProps = (
  dispatch: Dispatch,
  ownProps: PassedInProps
): DispatchProps => ({
  openUploadDialogHandler: () => {
    dispatch(openUploadImagesDialog());
  },
  openEditAlbumDialogHandler: () => {
    dispatch(openAlbumInfoDialog(ownProps.currentAlbum));
  },
  openDeleteAlbumDialogHandler: () => {
    dispatch(openDeleteAlbumDialog(ownProps.currentAlbum));
  },
});

export default connect(null, mapDispatchToProps)(AdminMenuItems);
