import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

import { AlbumVO } from '../../../../configs/interfaces';
import { State } from '../../../../configs/redux/store';
import { ApplicationActions } from '../../../../creators/actions';
import { closeAlbumInfoDialog } from '../../../../creators/dialogs/album-info';
import {
  NewAlbumInfo,
  saveNewAlbum,
  UpdateAlbumInfo,
  updateAlbumInfo,
} from '../../../../firebase/services/firebase-albums-service';
import BaseDialog from '../../../shared/dialog/BaseDialog';
import AlbumAccessRadioGroup from './components/AlbumAccessRadioGroup';
import AlbumTextField from './components/AlbumTextField';
import OrderedAlbumRadioGroup from './components/OrderedAlbumRadioGroup';

interface NewAlbumDialogState {
  title: string;
  subtitle: string;
  isPrivateAlbum: boolean;
  imagesShouldBeOrdered: boolean;
}

const AlbumInfoDialog = (props: NewAlbumDialogProps): JSX.Element => {
  const { open, album, saveHandler, updateHandler, closeDialogHandler } = props;

  const isEditing = Boolean(album);

  const buildDefaultState = (album?: AlbumVO): NewAlbumDialogState => {
    return {
      title: album ? album.title : '',
      subtitle: album ? album.subtitle : '',
      isPrivateAlbum: true,
      imagesShouldBeOrdered: false,
    };
  };

  const [localState, setLocalState] = useState<NewAlbumDialogState>(
    buildDefaultState(album)
  );

  useEffect(() => {
    if (!open) {
      setTimeout(() => {
        setLocalState(buildDefaultState());
      }, 300);
    } else {
      setLocalState(buildDefaultState(album));
    }
  }, [open]);

  const handleChange = (field: 'title' | 'subtitle', value: string) => {
    setLocalState({
      ...localState,
      [field]: value,
    });
  };

  const handleAccessTypeRadioChange = (value: boolean) => {
    setLocalState({
      ...localState,
      isPrivateAlbum: value,
    });
  };

  const handleIsOrderedRadioChange = (value: boolean) => {
    setLocalState({
      ...localState,
      imagesShouldBeOrdered: value,
    });
  };

  const handleConfirmClick = () => {
    if (isEditing) {
      if (album) {
        updateHandler(
          {
            firebaseId: album.firebaseId,
            ...localState,
          },
          closeDialogHandler
        );
      }
    } else {
      saveHandler(localState, closeDialogHandler);
    }
  };

  return (
    <BaseDialog
      open={open}
      data-testid="album-info-dialog"
      title={isEditing ? 'Edit Album' : 'New Album Info'}
      dialogContent={
        <Grid container spacing={2}>
          <Grid item xs={12} container spacing={2} alignItems="center">
            <Grid item xs={12} sm={4}>
              <Typography>{'Title: '}</Typography>
            </Grid>
            <Grid item xs={12} sm={8}>
              <AlbumTextField
                name="title"
                autoFocus
                value={localState.title}
                changeHandler={handleChange}
              />
            </Grid>
          </Grid>
          <Grid item xs={12} container spacing={2} alignItems="center">
            <Grid item xs={12} sm={4}>
              <Typography>{'Subtitle: '}</Typography>
            </Grid>
            <Grid item xs={12} sm={8}>
              <AlbumTextField
                value={localState.subtitle}
                name="subtitle"
                changeHandler={handleChange}
              />
            </Grid>
          </Grid>
          <Grid item xs={12} container spacing={2} alignItems="center">
            <Grid item xs={12} sm={4} />
            <Grid item xs={12} sm={8}>
              <AlbumAccessRadioGroup
                isPrivateAlbum={localState.isPrivateAlbum}
                changeHandler={handleAccessTypeRadioChange}
              />
            </Grid>
          </Grid>
          <Grid item xs={12} container spacing={2} alignItems="center">
            <Grid item xs={12} sm={4} />
            <Grid item xs={12} sm={8}>
              <OrderedAlbumRadioGroup
                isOrdered={localState.imagesShouldBeOrdered}
                changeHandler={handleIsOrderedRadioChange}
              />
            </Grid>
          </Grid>
        </Grid>
      }
      closeDialogHandler={closeDialogHandler}
      dialogActions={
        <DialogActions>
          <Button onClick={closeDialogHandler}>{'Cancel'}</Button>
          <Button
            disabled={localState.title === ''}
            onClick={handleConfirmClick}
          >
            {isEditing ? 'Update' : 'Save'}
          </Button>
        </DialogActions>
      }
    />
  );
};

type NewAlbumDialogProps = StateProps & DispatchProps;

interface StateProps {
  open: boolean;
  album?: AlbumVO;
}

interface DispatchProps {
  saveHandler: (info: NewAlbumInfo, cb: () => void) => void;
  closeDialogHandler: () => void;
  updateHandler: (info: UpdateAlbumInfo, cb: () => void) => void;
}

const mapStateToProps = (state: State): StateProps => {
  return {
    open: state.appDialogState.albumInfoDialog.display,
    album: state.appDialogState.albumInfoDialog.selectedAlbumToEdit,
  };
};

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  saveHandler: (info: NewAlbumInfo, cb: () => void) => {
    (dispatch as ThunkDispatch<State, void, ApplicationActions>)(
      saveNewAlbum(info, cb)
    );
  },
  updateHandler: (info: UpdateAlbumInfo, cb: () => void) => {
    (dispatch as ThunkDispatch<State, void, ApplicationActions>)(
      updateAlbumInfo(info, cb)
    );
  },
  closeDialogHandler: () => {
    dispatch(closeAlbumInfoDialog());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(AlbumInfoDialog);
