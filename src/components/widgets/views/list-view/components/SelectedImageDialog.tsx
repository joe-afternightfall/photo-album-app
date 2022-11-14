import Dialog from '@mui/material/Dialog';
import React from 'react';

export default function SelectedImageDialog(
  props: SelectedImageDialogProps
): JSX.Element {
  const { open, image, closeHandler } = props;

  return (
    <Dialog open={open} onClose={closeHandler}>
      {image}
    </Dialog>
  );
}

interface SelectedImageDialogProps {
  open: boolean;
  image: JSX.Element;
  closeHandler: () => void;
}
