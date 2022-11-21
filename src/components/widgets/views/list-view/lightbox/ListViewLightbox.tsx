import StarIcon from '@mui/icons-material/StarRounded';
import Grid from '@mui/material/Grid';
import { makeStyles, createStyles } from '@mui/styles';
import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import Lightbox from 'yet-another-react-lightbox';
import Fullscreen from 'yet-another-react-lightbox/plugins/fullscreen';
import Slideshow from 'yet-another-react-lightbox/plugins/slideshow';
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails';

import { ImageVO } from '../../../../../configs/interfaces';
import { State } from '../../../../../configs/redux/store';

import 'yet-another-react-lightbox/plugins/thumbnails.css';
import 'yet-another-react-lightbox/styles.css';

const useStyles = makeStyles(() => createStyles({}));

const getAttributes = (type: string) => {
  const foundCurrentSlide = document.getElementsByClassName(
    'yarl__slide_current'
  );
  if (foundCurrentSlide.length) {
    const srcAttribute =
      foundCurrentSlide[0].firstElementChild?.getAttribute('src');
    const altAttribute =
      foundCurrentSlide[0].firstElementChild?.getAttribute('alt');
    console.log('******** srcAttribute: ' + JSON.stringify(srcAttribute));
    console.log(
      '!!!!!! ALT-ID FOR ' + type + ': ' + JSON.stringify(altAttribute)
    );
    // todo: check for favorite image ID here
  }
};

const ListViewLightbox = (props: ListViewLightboxProps): JSX.Element => {
  const classes = useStyles();
  const { open, images, closeHandler, selectedIndex } = props;

  const iconButton = (
    <Grid
      container
      alignItems="center"
      direction="column"
      justifyContent="center"
    >
      <Grid item sx={{ px: 1 }}>
        <StarIcon
          fontSize="medium"
          onClick={() => {
            console.log('star clicked');
          }}
          sx={{
            height: '100%',
            width: '32px',
            color: 'rgba(255, 255, 255, 0.8)',
          }}
        />
      </Grid>
    </Grid>
  );

  return (
    <Lightbox
      toolbar={{ buttons: [iconButton, 'close'] }}
      open={open}
      close={closeHandler}
      index={selectedIndex}
      slides={images.map((image) => {
        return {
          src: image.downloadURL,
          alt: image.id,
        };
      })}
      plugins={[Fullscreen, Slideshow, Thumbnails]}
      on={{
        view: () => getAttributes('viewed'),
        entered: () => getAttributes('entered'),
      }}
    />
  );
};

type ListViewLightboxProps = PassedInProps & StateProps & DispatchProps;

interface PassedInProps {
  open: boolean;
  closeHandler: () => void;
  selectedIndex: number;
  images: ImageVO[];
}

interface StateProps {
  DELETE_ME?: string;
}

interface DispatchProps {
  DELETE_ME?: string;
}

const mapStateToProps = (state: State): StateProps => {
  return {};
};

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({});

export default connect(mapStateToProps, mapDispatchToProps)(ListViewLightbox);
