import FilterListIcon from '@mui/icons-material/FilterList';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import IconButton from '@mui/material/IconButton';
import Popover from '@mui/material/Popover';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { ImageVO } from '../../../../../configs/interfaces';
import { ACCESS_TYPE } from '../../../../../configs/interfaces/image/ImageDAO';
import { State } from '../../../../../configs/redux/store';
import { filterImagesByAccessType } from '../../../../../creators/images';
import AppTooltip from '../../../../shared/app-tooltip/AppTooltip';

const ImageAccessTypePopover = (props: Props): JSX.Element => {
  const { accessType, images, changeHandler } = props;

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // setRadioValue((event.target as HTMLInputElement).value);
    changeHandler(event.target.value as unknown as ACCESS_TYPE, images);
  };

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div>
      <IconButton onClick={handleClick}>
        {open ? (
          <FilterListIcon />
        ) : (
          <AppTooltip title="Filter images" placement="bottom" arrow>
            <FilterListIcon />
          </AppTooltip>
        )}
      </IconButton>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        PaperProps={{
          sx: {
            minWidth: '240px',
            padding: '16px',
            paddingLeft: '24px',
          },
        }}
      >
        <FormControl>
          <FormLabel sx={{ mb: 1 }}>{'Image Access Type'}</FormLabel>
          <RadioGroup value={accessType} onChange={handleRadioChange}>
            <FormControlLabel
              value={ACCESS_TYPE.ALL}
              control={<Radio />}
              label="All"
            />
            <FormControlLabel
              value={ACCESS_TYPE.UNDEFINED}
              control={<Radio />}
              label="Undefined"
            />
            <FormControlLabel
              value={ACCESS_TYPE.PUBLIC}
              control={<Radio />}
              label="Public"
            />
            <FormControlLabel
              value={ACCESS_TYPE.PRIVATE}
              control={<Radio />}
              label="Private"
            />
          </RadioGroup>
        </FormControl>
      </Popover>
    </div>
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
)(ImageAccessTypePopover);
