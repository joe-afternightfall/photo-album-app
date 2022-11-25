import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import MenuItem from '@mui/material/MenuItem';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
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

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.stopPropagation();
    toggleAccessTypeHandler(
      (event.target as HTMLInputElement).value as unknown as ACCESS_TYPE
    );
  };

  const handleMenuChange = (accessType: ACCESS_TYPE) => {
    toggleAccessTypeHandler(accessType);
  };

  return (
    <FormControl sx={{ width: '100%' }}>
      <FormLabel id="access-type-radio-buttons-group">
        {'Access Type'}
      </FormLabel>
      <RadioGroup
        row
        aria-labelledby="access-type-radio-buttons-group"
        name="image-access-type-radio-buttons-group"
        value={image.accessType}
        onChange={handleRadioChange}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <MenuItem
          onClick={() => {
            handleMenuChange(ACCESS_TYPE.PUBLIC);
          }}
        >
          <FormControlLabel
            value={ACCESS_TYPE.PUBLIC}
            control={
              <Radio checked={image.accessType === ACCESS_TYPE.PUBLIC} />
            }
            label="Public"
          />
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleMenuChange(ACCESS_TYPE.PRIVATE);
          }}
        >
          <FormControlLabel
            value={ACCESS_TYPE.PRIVATE}
            control={
              <Radio checked={image.accessType === ACCESS_TYPE.PRIVATE} />
            }
            label="Private"
          />
        </MenuItem>
      </RadioGroup>
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
