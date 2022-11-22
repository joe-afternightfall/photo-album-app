import { Dialog, DialogContent } from '@mui/material';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import React from 'react';

import { BaseDialogProps } from '../BaseDialog';

export default function RegularDialog(props: BaseDialogProps): JSX.Element {
  const {
    open,
    'data-testid': testId,
    dialogActions,
    title,
    icon,
    dialogContent,
    maxWidth,
    closeDialogHandler,
  } = props;

  return (
    <Dialog
      open={open}
      maxWidth={maxWidth}
      fullWidth
      data-testid={testId}
      onClose={closeDialogHandler}
    >
      <DialogTitle>
        <Grid container alignItems="center" spacing={2}>
          {icon && <Grid item>{icon}</Grid>}
          <Grid item>
            <Typography variant="h6" data-testid="shared-dialog-title">
              {title}
            </Typography>
          </Grid>
        </Grid>
      </DialogTitle>

      <DialogContent>{dialogContent}</DialogContent>

      {dialogActions}
    </Dialog>
  );
}
