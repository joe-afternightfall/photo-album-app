import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import Collapse from '@mui/material/Collapse';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

import { State } from '../../../../configs/redux/store';
import { ApplicationActions } from '../../../../creators/actions';
import {
  NewAlbumInfo,
  saveNewAlbum,
} from '../../../../services/firebase-albums-service';
import PaperDropzone from '../../../shared/dropzone/DropZone';
import AlbumImageRadioGroup from './components/AlbumImageRadioGroup';
import AlbumTextField from './components/AlbumTextField';

interface NewAlbumDialogState {
  open: boolean;
  displayImageDropzone: boolean;
  title: string;
  subtitle: string;
  image: File[];
}

const AlbumInfoDialog = (props: NewAlbumDialogProps): JSX.Element => {
  const { saveHandler } = props;
  const [localState, setLocalState] = useState<NewAlbumDialogState>({
    open: false,
    title: '',
    subtitle: '',
    displayImageDropzone: false,
    image: [],
  });

  useEffect(() => {
    if (!localState.open) {
      setTimeout(() => {
        setLocalState({
          ...localState,
          title: '',
          subtitle: '',
          displayImageDropzone: false,
          image: [],
        });
      }, 300);
    }
  }, [localState.open]);

  const handleChange = (field: 'title' | 'subtitle', value: string) => {
    setLocalState({
      ...localState,
      [field]: value,
    });
  };

  const openDialog = () => {
    setLocalState({
      ...localState,
      open: true,
    });
  };

  const closeDialog = () => {
    setLocalState({
      ...localState,
      open: false,
    });
  };

  const handleDropzone = (files: File[]) => {
    setLocalState({
      ...localState,
      image: files,
    });
  };

  return (
    <>
      <Button onClick={openDialog} startIcon={<AddIcon />} variant="contained">
        {'New Album'}
      </Button>
      <Dialog open={localState.open} onClose={closeDialog}>
        <DialogTitle>{'Create New Album'}</DialogTitle>
        <DialogContent>
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
                <AlbumImageRadioGroup
                  changeHandler={(display: boolean) => {
                    setLocalState({
                      ...localState,
                      displayImageDropzone: display,
                    });
                  }}
                  displayImageDropzone={localState.displayImageDropzone}
                />
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Collapse
                in={localState.displayImageDropzone}
                timeout={'auto'}
                unmountOnExit
              >
                <PaperDropzone
                  dropzoneHandler={handleDropzone}
                  filesLimit={1}
                />
              </Collapse>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog}>{'Cancel'}</Button>
          <Button
            disabled={localState.title === ''}
            onClick={() => {
              saveHandler(
                {
                  title: localState.title,
                  subtitle: localState.subtitle,
                  image: localState.image.length
                    ? localState.image[0]
                    : undefined,
                },
                closeDialog
              );
            }}
          >
            {'Save'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

type NewAlbumDialogProps = DispatchProps;

interface DispatchProps {
  saveHandler: (info: NewAlbumInfo, cb: () => void) => void;
}

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  saveHandler: (info: NewAlbumInfo, cb: () => void) => {
    (dispatch as ThunkDispatch<State, void, ApplicationActions>)(
      saveNewAlbum(info, cb)
    );
  },
});

export default connect(null, mapDispatchToProps)(AlbumInfoDialog);
