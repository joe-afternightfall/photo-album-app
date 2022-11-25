import { useMediaQuery } from '@mui/material';
import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import { useTheme } from '@mui/material/styles';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { ImageVO } from '../../../../configs/interfaces';
import { State } from '../../../../configs/redux/store';
import { updateMultiSelectIds } from '../../../../creators/selected-album/multi-select-mode';
import ListViewLightbox from './lightbox/ListViewLightbox';
import ListViewImageItem from './masonry-image/ListViewImageItem';

const ListView = (props: Props): JSX.Element => {
  const theme = useTheme();
  const { images, selectedImageIdsForMultiEditing, updateSelectedIdsHandler } =
    props;
  const isXs = useMediaQuery(theme.breakpoints.down(700));

  const [displayFullImage, setDisplayFullImage] = useState({
    open: false,
    downloadURL: '',
    index: -1,
  });

  const toggleImageFromMultiSelect = (imageId: string) => {
    updateSelectedIdsHandler(imageId);
  };

  return (
    <Box>
      <ImageList variant="masonry" cols={isXs ? 2 : 4} gap={8}>
        {images.map((image, index) => {
          const isIn = selectedImageIdsForMultiEditing.indexOf(image.id) !== -1;
          return (
            <ListViewImageItem
              index={index}
              key={image.id}
              image={image}
              displayFullImageHandler={setDisplayFullImage}
              toggleImageFromMultiSelectHandler={toggleImageFromMultiSelect}
              imageIsInMultiSelectList={isIn}
            />
          );
        })}
      </ImageList>

      <ListViewLightbox
        open={displayFullImage.open}
        images={images}
        selectedIndex={displayFullImage.index}
        closeHandler={() => {
          setDisplayFullImage({
            open: false,
            downloadURL: '',
            index: -1,
          });
        }}
      />
    </Box>
  );
};

type Props = PassedInProps & StateProps & DispatchProps;

interface PassedInProps {
  images: ImageVO[];
}

interface StateProps {
  selectedImageIdsForMultiEditing: string[];
}

interface DispatchProps {
  updateSelectedIdsHandler: (imageId: string) => void;
}

const mapStateToProps = (state: State): StateProps => {
  return {
    selectedImageIdsForMultiEditing:
      state.selectedAlbumState.selectedImageIdsForMultiEditing,
  };
};

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  updateSelectedIdsHandler: (imageId: string) => {
    dispatch(updateMultiSelectIds(imageId));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ListView);
