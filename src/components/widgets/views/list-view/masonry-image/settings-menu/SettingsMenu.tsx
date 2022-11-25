import CollectionsIcon from '@mui/icons-material/Collections';
import CopyIcon from '@mui/icons-material/ContentCopy';
import DeleteIcon from '@mui/icons-material/Delete';
import DownloadIcon from '@mui/icons-material/Download';
import SettingsIcon from '@mui/icons-material/SettingsOutlined';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

import { ImageVO } from '../../../../../../configs/interfaces';
import { State } from '../../../../../../configs/redux/store';
import { ApplicationActions } from '../../../../../../creators/actions';
import { openDeleteImageDialog } from '../../../../../../creators/dialogs/delete-image';
import { updateAlbumCoverImage } from '../../../../../../firebase/services/firebase-albums-service';
import AccessTypeRadioGroup from './AccessTypeRadioGroup';

const SettingsMenu = (props: SettingsMenuProps): JSX.Element => {
  const {
    image,
    updateCoverImageHandler,
    clearOnHoverHandler,
    openDeleteDialogHandler,
  } = props;
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
    clearOnHoverHandler();
  };

  return (
    <div>
      <IconButton
        onClick={handleClick}
        sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
      >
        <SettingsIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={(e) => {
          e.stopPropagation();
        }}
        transformOrigin={{ horizontal: 'left', vertical: 'center' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'center' }}
      >
        <MenuList>
          <MenuItem
            onClick={(e) => {
              e.stopPropagation();
              updateCoverImageHandler();
              handleClose();
            }}
          >
            <ListItemIcon>
              <CollectionsIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>{'Make Album Cover'}</ListItemText>
          </MenuItem>
          <MenuItem
            onClick={(e) => {
              e.stopPropagation();
              openDeleteDialogHandler();
              handleClose();
            }}
          >
            <ListItemIcon>
              <DeleteIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>{'Delete photo'}</ListItemText>
          </MenuItem>
          <MenuItem disabled>
            <ListItemIcon>
              <DownloadIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>{'Download photo'}</ListItemText>
          </MenuItem>
          <MenuItem disabled>
            <ListItemIcon>
              <CopyIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>{'Copy Photo'}</ListItemText>
          </MenuItem>
          <Divider sx={{ my: 0.5 }} />
          <ListItem sx={{ width: '100%' }}>
            <AccessTypeRadioGroup image={image} />
          </ListItem>
        </MenuList>
      </Menu>
    </div>
  );
};

type SettingsMenuProps = PassedInProps & DispatchProps;

interface PassedInProps {
  albumFirebaseId: string;
  image: ImageVO;
  clearOnHoverHandler: () => void;
}

interface StateProps {
  imageFirebaseId: string;
}

interface DispatchProps {
  updateCoverImageHandler: () => void;
  openDeleteDialogHandler: () => void;
}

const mapStateToProps = (state: State, ownProps: PassedInProps): StateProps => {
  const foundImage = state.applicationState.images.find(
    (image) => image.id === ownProps.image.id
  );

  return {
    imageFirebaseId: foundImage ? foundImage.firebaseId : '',
  };
};

const mapDispatchToProps = (
  dispatch: Dispatch,
  ownProps: PassedInProps
): DispatchProps => ({
  updateCoverImageHandler: () => {
    (dispatch as ThunkDispatch<State, void, ApplicationActions>)(
      updateAlbumCoverImage(
        ownProps.albumFirebaseId,
        ownProps.image.downloadURL
      )
    );
  },
  openDeleteDialogHandler: () => {
    dispatch(
      openDeleteImageDialog(ownProps.image.firebaseId, ownProps.image.id)
    );
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(SettingsMenu);
