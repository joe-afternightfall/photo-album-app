import DeleteIcon from '@mui/icons-material/Delete';
import PublicIcon from '@mui/icons-material/Public';
import SecurityIcon from '@mui/icons-material/Security';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import { makeStyles, createStyles } from '@mui/styles';
import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { ImageVO } from '../../../../../configs/interfaces';
import { State } from '../../../../../configs/redux/store';
import {
  DeleteImageInfo,
  openDeleteImageDialog,
} from '../../../../../creators/dialogs/delete-image';
import {
  clearMultiSelectIds,
  toggleMultiSelectMode,
} from '../../../../../creators/selected-album/multi-select-mode';
import AppTooltip from '../../../../shared/app-tooltip/AppTooltip';

const useStyles = makeStyles(() => createStyles({}));

const MultiSelectAdminActions = (props: Props): JSX.Element => {
  const classes = useStyles();
  const { selectedImages, openDeleteDialogHandler } = props;

  return (
    <>
      <Divider orientation="vertical" flexItem />
      <Grid item>
        <AppTooltip title="Set as public" placement="bottom" arrow>
          <IconButton sx={{ mx: 1 }}>
            <PublicIcon />
          </IconButton>
        </AppTooltip>
      </Grid>
      <Grid item>
        <AppTooltip title="Set as private" placement="bottom" arrow>
          <IconButton sx={{ mr: 1 }}>
            <SecurityIcon />
          </IconButton>
        </AppTooltip>
      </Grid>
      <Grid item>
        <AppTooltip title="Delete" placement="bottom" arrow>
          <IconButton
            onClick={() => {
              openDeleteDialogHandler(
                selectedImages.map((image) => ({
                  imageId: image.id,
                  imageFirebaseId: image.firebaseId,
                }))
              );
            }}
          >
            <DeleteIcon />
          </IconButton>
        </AppTooltip>
      </Grid>
    </>
  );
};

type Props = PassedInProps & StateProps & DispatchProps;

interface PassedInProps {
  selectedImages: ImageVO[];
}

interface StateProps {
  DELETE_ME?: string;
}

interface DispatchProps {
  openDeleteDialogHandler: (info: DeleteImageInfo[]) => void;
}

const mapStateToProps = (state: State): StateProps => {
  return {};
};

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  openDeleteDialogHandler: (info: DeleteImageInfo[]) => {
    dispatch(
      openDeleteImageDialog(info, () => {
        dispatch(toggleMultiSelectMode(false));
        dispatch(clearMultiSelectIds());
      })
    );
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MultiSelectAdminActions);
