import SaveIcon from '@mui/icons-material/Save';
import LoadingButton from '@mui/lab/LoadingButton';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';
import Compressor from 'compressorjs';
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

type LocalState = {
  originalImage: File;
  compressedImage: File | Blob;
};

const UploadImageDialog = (props: Props): JSX.Element => {
  const { open, closeHandler, selectedAlbum, saveHandler } = props;
  const [images, setImages] = useState<LocalState[]>([]);
  const [loading, setLoading] = useState(false);

  const handleDropzone = async (files: File[]) => {
    const imagesToUpdate: LocalState[] = [];

    files.map((originalImage) => {
      new Compressor(originalImage, {
        quality: 0.7,
        maxWidth: 600,
        maxHeight: 800,
        resize: 'contain',
        // resize: 'cover',
        // The compression process is asynchronous,
        // which means you have to access the `result` in the `success` hook function.
        async success(compressedImage) {
          imagesToUpdate.push({
            originalImage,
            compressedImage,
          });

          if (imagesToUpdate.length === files.length) {
            setImages(imagesToUpdate);
            setLoading(false);
          }
        },

        error(err) {
          console.error('!!!! error compressing image: ' + err.message);
        },
      });
    });
  };

  return (
    <Dialog open={open} onClose={closeHandler} maxWidth="sm" fullWidth>
      <DialogTitle>{'Add Images'}</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <PaperDropzone
              dropzoneHandler={handleDropzone}
              filesLimit={100}
              onDropHandler={() => {
                setLoading(true);
              }}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeHandler}>{'Cancel'}</Button>
        <LoadingButton
          loading={loading}
          loadingPosition="start"
          startIcon={<SaveIcon />}
          onClick={() => {
            selectedAlbum &&
              saveHandler(selectedAlbum.id, images, closeHandler);
          }}
          disabled={images.length === 0}
        >
          {'Save'}
        </LoadingButton>
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
  saveHandler: (albumId: string, images: LocalState[], cb: () => void) => void;
}

const mapStateToProps = (state: State): StateProps => {
  return {
    selectedAlbum: state.selectedAlbumState.currentAlbum,
    open: state.appDialogState.uploadImageDialog.display,
  };
};

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  saveHandler: (albumId: string, images: LocalState[], cb: () => void) => {
    (dispatch as ThunkDispatch<State, void, ApplicationActions>)(
      uploadImages(albumId, images, cb)
    );
  },
  closeHandler: () => {
    dispatch(closeUploadImagesDialog());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(UploadImageDialog);
