import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { ImageVO } from '../../../../configs/interfaces';
import { ACCESS_TYPE } from '../../../../configs/interfaces/image/ImageDAO';
import { State } from '../../../../configs/redux/store';
import { filterImagesByAccessType } from '../../../../creators/images';

const ImageAccessTypeSelectMenu = (props: Props): JSX.Element => {
  const { accessType, images, changeHandler } = props;

  const handleChange = (event: SelectChangeEvent) => {
    changeHandler(event.target.value as unknown as ACCESS_TYPE, images);
  };

  return (
    <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
      <InputLabel id="access-type-select-menu-label">
        {'Access Type'}
      </InputLabel>
      <Select
        labelId="access-type-select-menu-label"
        id="access-type-select-menu"
        value={accessType}
        onChange={handleChange}
      >
        <MenuItem value={ACCESS_TYPE.ALL}>{'All'}</MenuItem>
        <MenuItem value={ACCESS_TYPE.UNDEFINED}>{'Undefined'}</MenuItem>
        <MenuItem value={ACCESS_TYPE.PUBLIC}>{'Public'}</MenuItem>
        <MenuItem value={ACCESS_TYPE.PRIVATE}>{'Private'}</MenuItem>
      </Select>
    </FormControl>
  );
};

type Props = StateProps & DispatchProps;

interface StateProps {
  accessType: ACCESS_TYPE;
  images: ImageVO[];
}

interface DispatchProps {
  changeHandler: (accessType: ACCESS_TYPE, images: ImageVO[]) => void;
}

const mapStateToProps = (state: State): StateProps => {
  return {
    accessType: state.selectedAlbumState.filterImagesForAccessType,
    images: state.applicationState.images,
  };
};

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  changeHandler: (accessType: ACCESS_TYPE, images: ImageVO[]) => {
    dispatch(filterImagesByAccessType(accessType, images));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ImageAccessTypeSelectMenu);
