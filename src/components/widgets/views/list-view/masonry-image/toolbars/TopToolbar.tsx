import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DoneIcon from '@mui/icons-material/Done';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import Avatar from '@mui/material/Avatar';
import { blue } from '@mui/material/colors';
import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { State } from '../../../../../../configs/redux/store';
import {
  toggleMultiSelectMode,
  updateHoveringOverIconId,
  updateMultiSelectIds,
} from '../../../../../../creators/selected-album/multi-select-mode';

const TopToolbar = (props: TopToolbarProps): JSX.Element => {
  const {
    imageId,
    onHoverHandler,
    toggleHandler,
    imageIsInMultiSelectList,
    hoveringOverUncheckedIconId,
    setIsInMultiSelectModeClickHandler,
  } = props;

  const isHoveringOverIcon = hoveringOverUncheckedIconId === imageId;

  return (
    <div style={{ position: 'absolute' }}>
      {imageIsInMultiSelectList ? (
        <Avatar
          sx={{
            height: '24px',
            width: '24px',
            ml: 1,
            mt: 1,
            bgcolor: blue[500],
          }}
        >
          <DoneIcon
            onClick={(e) => {
              e.stopPropagation();
              toggleHandler(imageId);
              onHoverHandler('');
            }}
          />
        </Avatar>
      ) : isHoveringOverIcon ? (
        <CheckCircleIcon
          sx={{ ml: 1, mt: 1 }}
          onMouseLeave={() => {
            onHoverHandler('');
          }}
          onClick={(e) => {
            e.stopPropagation();
            setIsInMultiSelectModeClickHandler();
            toggleHandler(imageId);
          }}
        />
      ) : (
        <RadioButtonUncheckedIcon
          sx={{ ml: 1, mt: 1 }}
          onMouseOver={() => {
            onHoverHandler(imageId);
          }}
          onMouseLeave={() => {
            onHoverHandler('');
          }}
        />
      )}
    </div>
  );
};

type TopToolbarProps = PassedInProps & StateProps & DispatchProps;

interface PassedInProps {
  imageId: string;
}

interface StateProps {
  imageIsInMultiSelectList: boolean;
  hoveringOverUncheckedIconId: string;
}

interface DispatchProps {
  onHoverHandler: (imageId: string) => void;
  setIsInMultiSelectModeClickHandler: () => void;
  toggleHandler: (imageId: string) => void;
}

const mapStateToProps = (state: State, ownProps: PassedInProps): StateProps => {
  const selectedIds = state.selectedAlbumState.selectedImageIdsForMultiEditing;
  const isIn = selectedIds.indexOf(ownProps.imageId) !== -1;

  return {
    hoveringOverUncheckedIconId:
      state.selectedAlbumState.hoveringOverUncheckedIconId,
    imageIsInMultiSelectList: isIn,
  };
};

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  onHoverHandler: (iconId: string) => {
    dispatch(updateHoveringOverIconId(iconId));
  },
  setIsInMultiSelectModeClickHandler: () => {
    dispatch(toggleMultiSelectMode(true));
  },
  toggleHandler: (imageId: string) => {
    dispatch(updateMultiSelectIds(imageId));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(TopToolbar);
