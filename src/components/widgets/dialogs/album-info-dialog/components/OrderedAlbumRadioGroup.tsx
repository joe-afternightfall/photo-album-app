import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import React from 'react';

export default function OrderedAlbumRadioGroup(
  props: OrderedAlbumRadioGroupProps
): JSX.Element {
  const { isOrdered, changeHandler } = props;

  return (
    <FormControl>
      <FormLabel id="album-ordered-radio-group-label">
        {'Album images are ordered numerically'}
      </FormLabel>
      <RadioGroup
        row
        aria-labelledby="album-ordered-radio-group-label"
        name="album-ordered-radio-buttons-group"
      >
        <FormControlLabel
          sx={{ minWidth: 140 }}
          value="yes"
          onClick={() => {
            changeHandler(true);
          }}
          control={<Radio checked={isOrdered} />}
          label="Yes"
        />
        <FormControlLabel
          value="no"
          onClick={() => {
            changeHandler(false);
          }}
          control={<Radio checked={!isOrdered} />}
          label="No"
        />
      </RadioGroup>
    </FormControl>
  );
}

interface OrderedAlbumRadioGroupProps {
  isOrdered: boolean;
  changeHandler: (isOrdered: boolean) => void;
}
