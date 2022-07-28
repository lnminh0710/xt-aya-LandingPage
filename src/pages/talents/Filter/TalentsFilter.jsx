import FilterControl from 'components/own/filter/FilterControl';

import styles from './TalentsFilter.module.scss';

import { talentFilterMockup } from 'mockups/talents';

const TalentsFilter = () => {
  return (
    <div className={styles.root}>
      {talentFilterMockup.map((_filter, index) => (
        <FilterControl
          key={index}
          {..._filter}
          width='100%'
          placeholder={_filter.title}
          onChange={() => {}}
        />
      ))}
    </div>
  );
};

export default TalentsFilter;
