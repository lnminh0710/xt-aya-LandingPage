import { useCallback, useMemo, useState } from 'react';
import Select from 'react-select';
import styled from 'styled-components';
import { find } from 'lodash';

import { ChevronDown } from 'assets/svg';

const SelectAction = styled(Select)`
  cursor: pointer;
  width: ${({ width }) => width || '100px'};
  font-size: 16px;
  height: 48px;
  .select2-selection__indicators {
    padding-right: 24px;
  }
  .select2-selection__menu {
    z-index: 7;
  }
  .select2-selection__control {
    border: 1px solid #e8e8e8;
    box-sizing: border-box;
    height: 48px;
    min-height: 48px;
    border-radius: 20px;
  }
  .select2-selection__value-container {
    padding: 0 12px 0 24px;
  }
`;

const FilterSelectPicker = ({
  label,
  name,
  onChange,
  options,
  optionEmpty,
  optionUrl,
  placeholder,
  value,
  ...rest
}) => {
  const [selectOptions, setSelectOption] = useState(options);

  // useEffect(() => {
  //   if (optionUrl) {
  //     callGetAPI(optionUrl?.url).then((res) => {
  //       const _opts = get(res, ['data'], res).map((_d) => ({
  //         label: get(_d, optionUrl.keyLabel),
  //         value: replace(get(_d, optionUrl.keyValue), '/', ''),
  //       }));
  //       if (optionEmpty) _opts.unshift({ label: placeholder, value: '' });
  //       setSelectOption(_opts);
  //     });
  //   }
  // }, [optionEmpty, optionUrl, placeholder]);

  const selectedValue = useMemo(
    () => (value ? find(selectOptions, ['value', value]) : null),
    [selectOptions, value]
  );
  const handleSelectGroup = useCallback(
    (item) => {
      onChange({ target: { name, value: item.value } });
    },
    [name, onChange]
  );

  return (
    <SelectAction
      {...rest}
      placeholder={placeholder || label}
      value={selectedValue}
      onChange={handleSelectGroup}
      options={selectOptions}
      classNamePrefix='select2-selection'
      components={{
        DropdownIndicator: ChevronDown,
        IndicatorSeparator: null,
      }}
    />
  );
};

export default FilterSelectPicker;
