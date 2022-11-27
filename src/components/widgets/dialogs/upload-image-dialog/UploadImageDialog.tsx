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
import { closeUploadImagesDialog } from '../../../../creators/dialogs/upload-images';
import { uploadImages } from '../../../../firebase/services/firebase-storage-service';
import PaperDropzone from '../../../shared/dropzone/DropZone';

const UploadImageDialog = (props: Props): JSX.Element => {
  const { open, closeHandler, selectedAlbum, saveHandler } = props;
  const [images, setImages] = useState<File[]>([]);

  const handleDropzone = (files: File[]) => {
    setImages(files);
  };

  return (
    <Dialog open={open} onClose={closeHandler} maxWidth="sm" fullWidth>
      <DialogTitle>{'Add Images'}</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <PaperDropzone dropzoneHandler={handleDropzone} filesLimit={100} />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeHandler}>{'Cancel'}</Button>
        <Button
          onClick={() => {
            selectedAlbum &&
              saveHandler(selectedAlbum.id, images, closeHandler);
          }}
        >
          {'Save'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

type Props = StateProps & DispatchProps;

interface StateProps {
  selectedAlbum?: AlbumVO;
  open: boolean;
}

interface DispatchProps {
  closeHandler: () => void;
  saveHandler: (albumId: string, images: File[], cb: () => void) => void;
}

const mapStateToProps = (state: State): StateProps => {
  return {
    selectedAlbum: state.selectedAlbumState.currentAlbum,
    open: state.appDialogState.uploadImageDialog.display,
  };
};

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  saveHandler: (albumId: string, images: File[], cb: () => void) => {
    (dispatch as ThunkDispatch<State, void, ApplicationActions>)(
      uploadImages(albumId, images, cb)
    );
  },
  closeHandler: () => {
    dispatch(closeUploadImagesDialog());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(UploadImageDialog);
