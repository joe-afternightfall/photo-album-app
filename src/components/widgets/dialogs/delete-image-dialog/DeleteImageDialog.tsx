import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import SwipeableViews from 'react-swipeable-views';
import { Dispatch } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

import { State } from '../../../../configs/redux/store';
import { ApplicationActions } from '../../../../creators/actions';
import {
  closeDeleteImageDialog,
  DeleteImageInfo,
} from '../../../../creators/dialogs/delete-image';
import { removeImagesFromAlbum } from '../../../../firebase/services/firebase-albums-service';
import { permanentlyDeleteImages } from '../../../../firebase/services/firebase-images-service';
import BaseDialog from '../../../shared/dialog/BaseDialog';
import TabPanel from '../../../top-level-components/sign-in-screen/components/TabPanel';

const DeleteImageDialog = (props: DeleteImageDialogProps): JSX.Element => {
  const { open, callback, images, deleteHandler, closeDialogHandler } = props;

  const [dialogTitle, setDialogTitle] = useState('');
  const [currentTab, setCurrentTab] = useState(0);
  const [permDelete, setPermDelete] = useState(false);

  useEffect(() => {
    if (!open) {
      setTimeout(() => {
        setCurrentTab(0);
        setPermDelete(false);
        setDialogTitle('setDialogTitle');
      }, 350);
    } else {
      setDialogTitle(images.length === 1 ? 'Delete Image' : `Delete Image's`);
    }
  }, [open]);

  const handleChangeIndex = (index: number) => {
    setCurrentTab(index);
  };

  const buildWarning = (): string => {
    if (images.length === 1) {
      return permDelete
        ? `you are about to permanently delete 1 image.`
        : `don't worry your only removing 1 image from this album.`;
    } else {
      return permDelete
        ? `you are about to permanently delete ${images.length} images.`
        : `don't worry your only removing ${images.length} images from this album.`;
    }
  };

  return (
    <BaseDialog
      open={open}
      maxWidth="xs"
      data-testid="delete-image-dialog"
      title={currentTab === 0 ? dialogTitle : 'Are you sure?'}
      dialogContent={
        <SwipeableViews index={currentTab} onChangeIndex={handleChangeIndex}>
          <TabPanel value={currentTab} index={0}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Button
                  sx={{
                    bgcolor: 'background.paper',
                    p: 3,
                  }}
                  onClick={() => {
                    setPermDelete(true);
                    handleChangeIndex(1);
                  }}
                >
                  {'Permanently delete'}
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button
                  sx={{
                    bgcolor: 'background.paper',
                    p: 3,
                  }}
                  onClick={() => {
                    setPermDelete(false);
                    handleChangeIndex(1);
                  }}
                >
                  {'Remove from album'}
                </Button>
              </Grid>
            </Grid>
          </TabPanel>
          <TabPanel value={currentTab} index={1}>
            <Grid container>
              <Grid item xs={12}>
                <Typography variant="subtitle1">{buildWarning()}</Typography>
              </Grid>
            </Grid>
          </TabPanel>
        </SwipeableViews>
      }
      closeDialogHandler={closeDialogHandler}
      dialogActions={
        currentTab === 1 ? (
          <DialogActions>
            <Button onClick={closeDialogHandler}>{'Cancel'}</Button>
            <Button
              onClick={() => {
                deleteHandler(images, permDelete);
                closeDialogHandler();
                callback && callback();
              }}
            >
              {'Delete'}
            </Button>
          </DialogActions>
        ) : undefined
      }
    />
  );
};

type DeleteImageDialogProps = StateProps & DispatchProps;

interface StateProps {
  open: boolean;
  callback?: () => void;
  images: DeleteImageInfo[];
}

interface DispatchProps {
  closeDialogHandler: () => void;
  deleteHandler: (images: DeleteImageInfo[], permDelete: boolean) => void;
}

const mapStateToProps = (state: State): StateProps => {
  const dialogState = state.appDialogState.deleteImageDialog;
  return {
    open: dialogState.display,
    images: dialogState.images,
    callback: dialogState.cb,
  };
};

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  deleteHandler: (images: DeleteImageInfo[], permDelete: boolean) => {
    (dispatch as ThunkDispatch<State, void, ApplicationActions>)(
      permDelete
        ? permanentlyDeleteImages(images)
        : removeImagesFromAlbum(images)
    );
  },
  closeDialogHandler: () => {
    dispatch(closeDeleteImageDialog());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(DeleteImageDialog);
