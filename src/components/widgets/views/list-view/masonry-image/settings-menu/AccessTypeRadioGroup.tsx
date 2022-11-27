import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

import { ImageVO } from '../../../../../../configs/interfaces';
import { ACCESS_TYPE } from '../../../../../../configs/interfaces/image/ImageDAO';
import { State } from '../../../../../../configs/redux/store';
import { ApplicationActions } from '../../../../../../creators/actions';
import { toggleImageAccessType } from '../../../../../../firebase/services/firebase-images-service';

const AccessTypeRadioGroup = (props: Props): JSX.Element => {
  const { image, toggleAccessTypeHandler } = props;

  const handleMenuChange = (accessType: ACCESS_TYPE) => {
    toggleAccessTypeHandler(accessType);
  };

  return (
    <FormControl sx={{ width: '100%' }}>
      <FormLabel id="access-type-radio-buttons-group">
        {'Access Type'}
      </FormLabel>
      <Grid container>
        <Grid item>
          <MenuItem
            onClick={() => {
              handleMenuChange(ACCESS_TYPE.PUBLIC);
            }}
          >
            <FormControlLabel
              value={ACCESS_TYPE.PUBLIC}
              control={
                image.accessType === ACCESS_TYPE.PUBLIC ? (
                  <RadioButtonCheckedIcon sx={{ mr: 1 }} />
                ) : (
                  <RadioButtonUncheckedIcon sx={{ mr: 1 }} />
                )
              }
              label="Public"
            />
          </MenuItem>
        </Grid>
        <Grid item>
          <MenuItem
            onClick={() => {
              handleMenuChange(ACCESS_TYPE.PRIVATE);
            }}
          >
            <FormControlLabel
              value={ACCESS_TYPE.PRIVATE}
              control={
                image.accessType === ACCESS_TYPE.PRIVATE ? (
                  <RadioButtonCheckedIcon sx={{ mr: 1 }} />
                ) : (
                  <RadioButtonUncheckedIcon sx={{ mr: 1 }} />
                )
              }
              label="Private"
            />
          </MenuItem>
        </Grid>
      </Grid>
    </FormControl>
  );
};

type Props = PassedInProps & DispatchProps;

interface PassedInProps {
  image: ImageVO;
}

interface DispatchProps {
  toggleAccessTypeHandler: (accessType: ACCESS_TYPE) => void;
}

const mapDispatchToProps = (
  dispatch: Dispatch,
  ownProps: PassedInProps
): DispatchProps => ({
  toggleAccessTypeHandler: (accessType: ACCESS_TYPE) => {
    (dispatch as ThunkDispatch<State, void, ApplicationActions>)(
      toggleImageAccessType(ownProps.image.firebaseId, accessType)
    );
  },
});

export default connect(null, mapDispatchToProps)(AccessTypeRadioGroup);
