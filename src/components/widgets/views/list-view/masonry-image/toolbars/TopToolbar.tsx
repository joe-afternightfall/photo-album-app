import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DoneIcon from '@mui/icons-material/Done';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import Avatar from '@mui/material/Avatar';
import { blue } from '@mui/material/colors';
import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { State } from '../../../../../../configs/redux/store';

const TopToolbar = (props: TopToolbarProps): JSX.Element => {
  const {
    imageId,
    onHoverHandler,
    toggleHandler,
    imageIsInMultiSelectList,
    hoveringOverUncheckedIconId,
    setIsInMultiSelectModeClickHandler,
  } = props;

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
      ) : hoveringOverUncheckedIconId ? (
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
  imageIsInMultiSelectList: boolean;
  // hoveringOverUncheckedIcon: boolean; // todo: try this out as a boolean with isEmpty()
  hoveringOverUncheckedIconId: string;
  toggleHandler: (imageId: string) => void;
  onHoverHandler: (imageId: string) => void;
  setIsInMultiSelectModeClickHandler: () => void;
}

interface StateProps {
  DELETE_ME?: string;
}

interface DispatchProps {
  DELETE_ME?: string;
}

const mapStateToProps = (state: State): StateProps => {
  return {};
};

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({});

export default connect(mapStateToProps, mapDispatchToProps)(TopToolbar);
