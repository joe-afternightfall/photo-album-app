import { makeStyles, createStyles } from '@mui/styles';
import clsx from 'clsx';
import React from 'react';
import { connect } from 'react-redux';

import { ImageVO } from '../../../../../../configs/interfaces';
import { State } from '../../../../../../configs/redux/store';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      height: '100%',
      objectFit: 'contain',
      overflow: 'hidden',
      transition: 'transform .135s cubic-bezier(0,0,.2,1)',
    },
    itemImage: {
      transition: 'opacity .2s .1s cubic-bezier(.4,0,1,1)',
    },
    selectedImage: {
      zIndex: -1,
      position: 'sticky',
      transform: 'translateZ(0px) scale3d(0.85, 0.88, 1)',
      transition: 'transform .2s .1s cubic-bezier(.4,0,1,1)',
    },
  })
);

const Image = (props: ImageProps): JSX.Element => {
  const classes = useStyles();
  const { image, displayImage, onLoadHandler, imageIsInMultiSelectList } =
    props;

  return (
    <img
      onLoad={onLoadHandler}
      src={image.downloadURL}
      alt={image.fileName}
      loading="lazy"
      style={{
        opacity: displayImage ? 1 : 0,
      }}
      className={clsx(classes.root, {
        [classes.selectedImage]: imageIsInMultiSelectList,
        [classes.itemImage]: !imageIsInMultiSelectList,
      })}
    />
  );
};

type ImageProps = PassedInProps & StateProps;

interface PassedInProps {
  image: ImageVO;
  displayImage: boolean;
  onLoadHandler: () => void;
}

interface StateProps {
  imageIsInMultiSelectList: boolean;
}

const mapStateToProps = (state: State, ownProps: PassedInProps): StateProps => {
  const selectedIds = state.selectedAlbumState.selectedImageIdsForMultiEditing;
  const isIn = selectedIds.indexOf(ownProps.image.id) !== -1;

  return {
    imageIsInMultiSelectList: isIn,
  };
};

export default connect(mapStateToProps)(Image);
