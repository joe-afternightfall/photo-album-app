import Card from '@mui/material/Card';
import Skeleton from '@mui/material/Skeleton';
import { createStyles, makeStyles } from '@mui/styles';
import React from 'react';

import SkeletonImageToolbar from '../../../../shared/skeleton/skeleton-image-toolbar/SkeletonImageToolbar';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      width: '100%',
      objectFit: 'contain',
      overflow: 'hidden',
      position: 'absolute',
      top: 0,
      height: '100%',
      paddingBottom: '8px',
      transition: 'opacity .2s .1s cubic-bezier(.4,0,1,1)',
    },
    container: {
      display: 'flex',
      flexDirection: 'column',
      flexWrap: 'nowrap',
      justifyContent: 'flex-start',
      alignItems: 'stretch',
      alignContent: 'stretch',
      height: '100%',
    },
    skeletonWrapper: {
      flex: '1 1 auto',
      display: 'flex',
    },
  })
);

export default function SkeletonImage(props: Props): JSX.Element {
  const classes = useStyles();
  const { displayImage } = props;

  return (
    <Card
      square
      className={classes.root}
      sx={{
        opacity: displayImage ? 0 : 1,
        zIndex: displayImage ? -1 : 1,
      }}
    >
      <div className={classes.container}>
        <div className={classes.skeletonWrapper}>
          <Skeleton
            variant="rectangular"
            width={'100%'}
            height={'100%'}
            animation={false}
          />
        </div>
        <div>
          <SkeletonImageToolbar />
        </div>
      </div>
    </Card>
  );
}

interface Props {
  displayImage: boolean;
}
