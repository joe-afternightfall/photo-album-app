import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import React from 'react';

export default function AlbumAccessRadioGroup(
  props: AlbumAccessRadioGroupProps
): JSX.Element {
  const { isPrivateAlbum, changeHandler } = props;

  return (
    <FormControl>
      <FormLabel id="album-access-type-radio-group-label">
        {'Access type'}
      </FormLabel>
      <RadioGroup
        row
        aria-labelledby="album-access-type-radio-group-label"
        name="album-access-type-radio-buttons-group"
      >
        <FormControlLabel
          sx={{ minWidth: 140 }}
          value="public"
          onClick={() => {
            changeHandler(false);
          }}
          control={<Radio checked={!isPrivateAlbum} />}
          label="Public"
        />
        <FormControlLabel
          value="private"
          onClick={() => {
            changeHandler(true);
          }}
          control={<Radio checked={isPrivateAlbum} />}
          label="Private"
        />
      </RadioGroup>
    </FormControl>
  );
}

interface AlbumAccessRadioGroupProps {
  isPrivateAlbum: boolean;
  changeHandler: (isPrivate: boolean) => void;
}
