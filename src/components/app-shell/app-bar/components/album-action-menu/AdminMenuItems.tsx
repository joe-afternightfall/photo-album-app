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
import { State } from '../../../../../configs/redux/store';
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
        <ListItemText>{'Edit'}</ListItemText>
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
        <ListItemText>{'Delete'}</ListItemText>
      </MenuItem>
    </>
  );
};

type AdminMenuItemsProps = PassedInProps & StateProps & DispatchProps;

interface PassedInProps {
  closeHandler: () => void;
  currentAlbum: AlbumVO;
}

interface StateProps {
  currentAlbumzzzz?: AlbumVO;
}

interface DispatchProps {
  openUploadDialogHandler: () => void;
  openEditAlbumDialogHandler: () => void;
  openDeleteAlbumDialogHandler: () => void;
}

const mapStateToProps = (state: State): StateProps => {
  return {};
};

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

export default connect(mapStateToProps, mapDispatchToProps)(AdminMenuItems);
