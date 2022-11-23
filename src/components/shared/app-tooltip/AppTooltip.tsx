import { TooltipProps } from '@mui/material';
import Fade from '@mui/material/Fade';
import Tooltip from '@mui/material/Tooltip';
import React from 'react';

export default function AppTooltip(props: AppTooltipProps): JSX.Element {
  const { arrow, children, title, placement } = props;

  return (
    <Tooltip
      arrow={arrow}
      title={title}
      placement={placement}
      enterDelay={500}
      leaveDelay={200}
      TransitionComponent={Fade}
      TransitionProps={{ timeout: 600 }}
    >
      {children}
    </Tooltip>
  );
}

interface AppTooltipProps {
  arrow?: boolean;
  children: JSX.Element;
  title: string;
  placement: TooltipProps['placement'];
}
