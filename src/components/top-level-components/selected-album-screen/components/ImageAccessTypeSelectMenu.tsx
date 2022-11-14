import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { makeStyles, createStyles } from '@mui/styles';
import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { ACCESS_TYPE } from '../../../../configs/interfaces/image/ImageDAO';
import { State } from '../../../../configs/redux/store';
import { filterImagesByAccessType } from '../../../../creators/images';

const useStyles = makeStyles(() => createStyles({}));

const ImageAccessTypeSelectMenu = (
  props: ImageAccessTypeSelectMenuProps
): JSX.Element => {
  const classes = useStyles();
  const { accessType, changeHandler } = props;
  const [age, setAge] = React.useState(0);

  const handleChange = (event: SelectChangeEvent) => {
    changeHandler(event.target.value as unknown as ACCESS_TYPE);
    // setAge(Number(event.target.value));
  };

  return (
    <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
      <InputLabel id="access-type-select-menu-label">
        {'Access Type'}
      </InputLabel>
      <Select
        labelId="access-type-select-menu-label"
        id="access-type-select-menu"
        value={accessType}
        onChange={handleChange}
      >
        {/*<MenuItem value="">*/}
        {/*  <em>None</em>*/}
        {/*</MenuItem>*/}
        <MenuItem value={ACCESS_TYPE.ALL}>{'All'}</MenuItem>
        <MenuItem value={ACCESS_TYPE.UNDEFINED}>{'Undefined'}</MenuItem>
        <MenuItem value={ACCESS_TYPE.PUBLIC}>{'Public'}</MenuItem>
        <MenuItem value={ACCESS_TYPE.PRIVATE}>{'Private'}</MenuItem>
      </Select>
    </FormControl>
  );
};

type ImageAccessTypeSelectMenuProps = PassedInProps &
  StateProps &
  DispatchProps;

interface PassedInProps {
  DELETE_ME?: string;
}

interface StateProps {
  accessType: ACCESS_TYPE;
}

interface DispatchProps {
  changeHandler: (accessType: ACCESS_TYPE) => void;
}

const mapStateToProps = (state: State): StateProps => {
  return {
    accessType: state.applicationState.filterImagesForAccessType,
  };
};

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  changeHandler: (accessType: ACCESS_TYPE) => {
    dispatch(filterImagesByAccessType(accessType));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ImageAccessTypeSelectMenu);
