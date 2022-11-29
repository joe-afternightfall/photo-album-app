import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { routerActions } from 'connected-react-router';
import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

import { AppPaths } from '../../../../configs/app-settings/app-routes';
import { AlbumVO } from '../../../../configs/interfaces';
import { State } from '../../../../configs/redux/store';
import { ApplicationActions } from '../../../../creators/actions';
import { closeDeleteAlbumDialog } from '../../../../creators/dialogs/album-info';
import { deleteAlbum } from '../../../../firebase/services/firebase-albums-service';
import BaseDialog from '../../../shared/dialog/BaseDialog';

const DeleteAlbumDialog = (props: DeleteAlbumDialogProps): JSX.Element => {
  const { open, album, closeDialogHandler, routeToHandler, deleteHandler } =
    props;

  return (
    <BaseDialog
      open={open}
      maxWidth="xs"
      data-testid="delete-album-dialog"
      title="Delete Album"
      dialogContent={
        <Grid container>
          <Grid item>
            {album && (
              <Typography>{`You are about to delete ${album.title}`}</Typography>
            )}
          </Grid>
          <Grid item>
            <Typography>{'this action can not be undone'}</Typography>
          </Grid>
        </Grid>
      }
      closeDialogHandler={closeDialogHandler}
      dialogActions={
        <DialogActions>
          <Button onClick={closeDialogHandler}>{'Cancel'}</Button>
          <Button
            onClick={() => {
              album &&
                deleteHandler(album.firebaseId, () => {
                  closeDialogHandler();
                  routeToHandler();
                });
            }}
          >
            {'Delete'}
          </Button>
        </DialogActions>
      }
    />
  );
};

type DeleteAlbumDialogProps = StateProps & DispatchProps;

interface StateProps {
  open: boolean;
  album?: AlbumVO;
}

interface DispatchProps {
  closeDialogHandler: () => void;
  routeToHandler: () => void;
  deleteHandler: (firebaseId: string, cb: () => void) => void;
}

const mapStateToProps = (state: State): StateProps => {
  return {
    open: state.appDialogState.deleteAlbumDialog.display,
    album: state.appDialogState.deleteAlbumDialog.album,
  };
};

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  closeDialogHandler: () => {
    dispatch(closeDeleteAlbumDialog());
  },
  routeToHandler: () => {
    dispatch(routerActions.push(AppPaths.dashboard));
  },
  deleteHandler: (firebaseId: string, cb: () => void) => {
    (dispatch as ThunkDispatch<State, void, ApplicationActions>)(
      deleteAlbum(firebaseId, cb)
    );
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(DeleteAlbumDialog);
