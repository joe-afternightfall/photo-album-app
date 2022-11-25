import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DoneIcon from '@mui/icons-material/Done';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import Avatar from '@mui/material/Avatar';
import { blue } from '@mui/material/colors';
import React from 'react';

export default function TopToolbar(props: Props): JSX.Element {
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
}

interface Props {
  imageId: string;
  imageIsInMultiSelectList: boolean;
  // hoveringOverUncheckedIcon: boolean; // todo: try this out as a boolean with isEmpty()
  hoveringOverUncheckedIconId: string;
  toggleHandler: (imageId: string) => void;
  onHoverHandler: (imageId: string) => void;
  setIsInMultiSelectModeClickHandler: () => void;
}
