import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import React from 'react';

export default function AlbumImageRadioGroup(
  props: AlbumImageRadioGroupProps
): JSX.Element {
  const { displayImageDropzone, changeHandler } = props;

  return (
    <FormControl>
      <FormLabel id="album-image-radio-group-label">{'Album Image'}</FormLabel>
      <RadioGroup
        row
        aria-labelledby="album-image-radio-group-label"
        name="album-image-radio-buttons-group"
      >
        <FormControlLabel
          value="notNow"
          onClick={() => {
            changeHandler(false);
          }}
          control={<Radio checked={!displayImageDropzone} />}
          label="Not Now"
        />
        <FormControlLabel
          value="addNew"
          onClick={() => {
            changeHandler(true);
          }}
          control={<Radio checked={displayImageDropzone} />}
          label="Add Image"
        />
      </RadioGroup>
    </FormControl>
  );
}

interface AlbumImageRadioGroupProps {
  displayImageDropzone: boolean;
  changeHandler: (addWithImage: boolean) => void;
}
