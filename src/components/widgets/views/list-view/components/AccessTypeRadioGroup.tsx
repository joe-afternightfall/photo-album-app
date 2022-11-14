import SecurityIcon from '@mui/icons-material/Security';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import { makeStyles, createStyles } from '@mui/styles';
import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

import { ImageVO } from '../../../../../configs/interfaces';
import { ACCESS_TYPE } from '../../../../../configs/interfaces/image/ImageDAO';
import { State } from '../../../../../configs/redux/store';
import { ApplicationActions } from '../../../../../creators/actions';
import { toggleImageAccessType } from '../../../../../services/firebase-images-service';

const useStyles = makeStyles(() => createStyles({}));

const AccessTypeRadioGroup = (props: Props): JSX.Element => {
  const classes = useStyles();
  const { image, toggleAccessTypeHandler } = props;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.stopPropagation();
    toggleAccessTypeHandler(
      (event.target as HTMLInputElement).value as unknown as ACCESS_TYPE
    );
  };

  return (
    <FormControl sx={{ width: '100%' }}>
      <FormLabel id="demo-controlled-radio-buttons-group">
        {'Access Type'}
      </FormLabel>
      <RadioGroup
        aria-labelledby="demo-controlled-radio-buttons-group"
        name="controlled-radio-buttons-group"
        value={image.accessType}
        onChange={handleChange}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <MenuItem>
          <FormControlLabel
            value={ACCESS_TYPE.PUBLIC}
            control={
              <Radio checked={image.accessType === ACCESS_TYPE.PUBLIC} />
            }
            label="Public"
          />
        </MenuItem>
        <MenuItem>
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

type Props = PassedInProps & StateProps & DispatchProps;

interface PassedInProps {
  image: ImageVO;
}

interface StateProps {
  DELETE_ME?: string;
}

interface DispatchProps {
  toggleAccessTypeHandler: (accessType: ACCESS_TYPE) => void;
}

const mapStateToProps = (state: State): StateProps => {
  return {};
};

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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AccessTypeRadioGroup);
