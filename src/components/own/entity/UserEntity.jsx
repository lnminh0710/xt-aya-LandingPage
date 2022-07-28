import { DotMenuIcon } from 'assets/svg';
import clsx from 'clsx';
import { memo } from 'react';
import { checkProperties } from 'utils/common';

import ImageLazyLoad from '../ImageLazyLoad';

import styles from './UserEntity.module.scss';

const UserEntity = ({ avatar, loading, name, job }) => {
  if (loading)
    return (
      <div className={styles.root}>
        <div
          className={clsx('react-loading-skeleton', styles['skeleton__avatar'])}
        ></div>
        <div
          className={clsx('react-loading-skeleton', styles['skeleton__info'])}
        ></div>
      </div>
    );
  return (
    <div className={styles.root}>
      <div>
        <ImageLazyLoad src={avatar} alt={name} width={64} height={64} />
      </div>
      <div className={styles.info}>
        <div className={styles.info__title}>{name}</div>
        <div className={styles['info__sub-title']}>{job}</div>
      </div>
      <div className={styles.action}>
        <DotMenuIcon />
      </div>
    </div>
  );
};

export default memo(UserEntity, checkProperties);
