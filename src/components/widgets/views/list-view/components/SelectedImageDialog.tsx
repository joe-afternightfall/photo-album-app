import Dialog from '@mui/material/Dialog';
import React from 'react';

export default function SelectedImageDialog(
  props: SelectedImageDialogProps
): JSX.Element {
  const { open, downloadURL, closeHandler } = props;

  return (
    <Dialog open={open} onClose={closeHandler}>
      <img
        src={downloadURL}
        alt={'selected image'}
        loading="lazy"
        style={{
          objectFit: 'contain',
          overflow: 'hidden',
        }}
      />
    </Dialog>
  );
}

interface SelectedImageDialogProps {
  open: boolean;
  downloadURL: string;
  closeHandler: () => void;
}
