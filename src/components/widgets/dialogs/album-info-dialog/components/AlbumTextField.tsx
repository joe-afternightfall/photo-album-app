import { TextField } from '@mui/material';
import React from 'react';
import { v4 as uuidv4 } from 'uuid';

export default function AlbumTextField(
  props: AlbumTextFieldProps
): JSX.Element {
  const { value, name, autoFocus, changeHandler } = props;

  return (
    <TextField
      autoFocus={autoFocus}
      variant="filled"
      fullWidth
      value={value}
      onChange={(e) => {
        changeHandler(name, e.target.value);
      }}
      name={uuidv4()}
      inputProps={{
        autoComplete: 'new-password',
        form: {
          autoComplete: 'off',
        },
      }}
    />
  );
}

interface AlbumTextFieldProps {
  value: string;
  autoFocus?: boolean;
  name: 'title' | 'subtitle';
  changeHandler: (field: 'title' | 'subtitle', value: string) => void;
}
