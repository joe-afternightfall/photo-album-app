import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Breakpoint } from '@mui/system';
import React from 'react';

import FullPageDialog from './variants/FullPageDialog';
import RegularDialog from './variants/RegularDialog';

export default function BaseDialog(props: BaseDialogProps): JSX.Element {
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down(700));

  return isXs ? <FullPageDialog {...props} /> : <RegularDialog {...props} />;
}

export interface BaseDialogProps {
  open: boolean;
  'data-testid': string;
  title: string;
  icon?: JSX.Element;
  dialogActions?: JSX.Element;
  dialogContent: JSX.Element;
  closeDialogHandler: () => void;
  maxWidth?: Breakpoint | false;
}
