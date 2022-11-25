import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import Typography from '@mui/material/Typography';
import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

import { State } from '../../../../configs/redux/store';
import { ApplicationActions } from '../../../../creators/actions';
import { closeDeleteImageDialog } from '../../../../creators/dialogs/delete-image';
import { deleteImage } from '../../../../firebase/services/firebase-images-service';
import BaseDialog from '../../../shared/dialog/BaseDialog';

const DeleteImageDialog = (props: DeleteImageDialogProps): JSX.Element => {
  const { open, imageId, imageFirebaseId, deleteHandler, closeDialogHandler } =
    props;

  return (
    <BaseDialog
      open={open}
      maxWidth="xs"
      data-testid="delete-image-dialog"
      title="Delete Image"
      dialogContent={<Typography>{'Delete Image?'}</Typography>}
      closeDialogHandler={closeDialogHandler}
      dialogActions={
        <DialogActions>
          <Button onClick={closeDialogHandler}>{'Cancel'}</Button>
          <Button
            onClick={() => {
              deleteHandler(imageFirebaseId, imageId);
              closeDialogHandler();
            }}
          >
            {'Delete'}
          </Button>
        </DialogActions>
      }
    />
  );
};

type DeleteImageDialogProps = PassedInProps & StateProps & DispatchProps;

interface PassedInProps {
  DELETE_ME?: string;
}

interface StateProps {
  open: boolean;
  imageId: string;
  imageFirebaseId: string;
}

interface DispatchProps {
  closeDialogHandler: () => void;
  deleteHandler: (imageFirebaseId: string, imageId: string) => void;
}

const mapStateToProps = (state: State): StateProps => {
  return {
    open: state.appDialogState.deleteImageDialog.display,
    imageId: state.appDialogState.deleteImageDialog.imageId,
    imageFirebaseId: state.appDialogState.deleteImageDialog.imageFirebaseId,
  };
};

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  deleteHandler: (imageFirebaseId: string, imageId: string) => {
    (dispatch as ThunkDispatch<State, void, ApplicationActions>)(
      deleteImage(imageFirebaseId, imageId)
    );
  },
  closeDialogHandler: () => {
    dispatch(closeDeleteImageDialog());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(DeleteImageDialog);
