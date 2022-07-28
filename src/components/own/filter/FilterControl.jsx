import { FilterControlTypes } from 'constants/field';
import { RangeSlider } from './RangeSlider';
import SelectPicker from './SelectPicker';

const FilterControl = ({ controlType = '', ...rest }) => {
  switch (controlType) {
    case FilterControlTypes.SELECT_PICKER:
      return <SelectPicker {...rest} />;
    case FilterControlTypes.SLIDE:
      return <RangeSlider {...rest} />;
    default:
      return <div />;
  }
};

export default FilterControl;
