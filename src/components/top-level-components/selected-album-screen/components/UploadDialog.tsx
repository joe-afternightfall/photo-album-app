import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

import { AlbumVO } from '../../../../configs/interfaces';
import { State } from '../../../../configs/redux/store';
import { ApplicationActions } from '../../../../creators/actions';
import { uploadImageFiles } from '../../../../services/firebase-upload-service';
import PaperDropzone from '../../../shared/dropzone/DropZone';

const UploadDialog = (props: UploadDialogProps): JSX.Element => {
  const { selectedAlbum, saveHandler } = props;
  const [open, setOpen] = useState(false);
  const [images, setImages] = useState<File[]>([]);

  const handleDropzone = (files: File[]) => {
    setImages(files);
  };

  const openDialog = () => {
    setOpen(true);
  };

  const closeDialog = () => {
    setOpen(false);
  };

  return (
    <>
      <Button
        startIcon={<CloudUploadIcon />}
        variant="outlined"
        onClick={openDialog}
      >
        {'Upload'}
      </Button>
      <Dialog open={open} onClose={closeDialog} maxWidth="sm" fullWidth>
        <DialogTitle>{'Add Images'}</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <PaperDropzone
                dropzoneHandler={handleDropzone}
                filesLimit={100}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog}>{'Cancel'}</Button>
          <Button
            onClick={() => {
              selectedAlbum &&
                saveHandler(selectedAlbum.id, images, closeDialog);
            }}
          >
            {'Save'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

type UploadDialogProps = PassedInProps & StateProps & DispatchProps;

interface PassedInProps {
  DELETE_ME?: string;
}

interface StateProps {
  selectedAlbum?: AlbumVO;
}

interface DispatchProps {
  saveHandler: (albumId: string, images: File[], cb: () => void) => void;
}

const mapStateToProps = (state: State): StateProps => {
  return {
    selectedAlbum: state.applicationState.selectedAlbumToView,
  };
};

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  saveHandler: (albumId: string, images: File[], cb: () => void) => {
    (dispatch as ThunkDispatch<State, void, ApplicationActions>)(
      uploadImageFiles(albumId, images, cb)
    );
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(UploadDialog);
