import CloseIcon from '@mui/icons-material/Close';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { makeStyles, createStyles } from '@mui/styles';
import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { State } from '../../../../configs/redux/store';
import {
  clearMultiSelectIds,
  toggleMultiSelectMode,
} from '../../../../creators/selected-album/multi-select-mode';

const useStyles = makeStyles(() => createStyles({}));

const MultiSelectToolbar = (props: Props): JSX.Element => {
  const classes = useStyles();
  const { selectedNumber, exitMultiSelectModeHandler } = props;
  return (
    <Toolbar>
      <IconButton
        color="inherit"
        edge="start"
        sx={{
          mr: 2,
        }}
        data-testid="exit-multi-select"
        onClick={exitMultiSelectModeHandler}
      >
        <CloseIcon />
      </IconButton>
      <Grid
        item
        xs={12}
        container
        alignItems="center"
        justifyContent="space-between"
      >
        <Grid item>
          <Typography
            variant="h6"
            noWrap
            component="div"
            data-testid="app-bar-title"
          >
            {selectedNumber + ' selected'}
          </Typography>
        </Grid>
      </Grid>
    </Toolbar>
  );
};

type Props = PassedInProps & StateProps & DispatchProps;

interface PassedInProps {
  DELETE_ME?: string;
}

interface StateProps {
  selectedNumber: number;
}

interface DispatchProps {
  exitMultiSelectModeHandler: () => void;
}

const mapStateToProps = (state: State): StateProps => {
  return {
    selectedNumber:
      state.selectedAlbumState.selectedImageIdsForMultiEditing.length,
  };
};

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  exitMultiSelectModeHandler: () => {
    dispatch(toggleMultiSelectMode(false));
    dispatch(clearMultiSelectIds());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(MultiSelectToolbar);
