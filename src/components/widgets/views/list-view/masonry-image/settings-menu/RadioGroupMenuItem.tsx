import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import React from 'react';

import { ACCESS_TYPE } from '../../../../../../configs/interfaces/image/ImageDAO';

export default function RadioGroupMenuItem(
  props: RadioGroupMenuItemProps
): JSX.Element {
  const { accessType, imageAccessType, changeHandler } = props;

  return (
    <Grid item>
      <MenuItem
        onClick={() => {
          changeHandler(accessType);
        }}
      >
        <FormControlLabel
          value={accessType}
          control={
            imageAccessType === accessType ? (
              <RadioButtonCheckedIcon sx={{ mr: 1 }} />
            ) : (
              <RadioButtonUncheckedIcon sx={{ mr: 1 }} />
            )
          }
          label={accessType === ACCESS_TYPE.PUBLIC ? 'Public' : 'Private'}
        />
      </MenuItem>
    </Grid>
  );
}

interface RadioGroupMenuItemProps {
  accessType: ACCESS_TYPE;
  imageAccessType: ACCESS_TYPE;
  changeHandler: (accessType: ACCESS_TYPE) => void;
}
