import clsx from 'clsx';
import { UserEntity } from 'components/own';
import { follower } from 'mockups/talent';
import Link from 'next/link';
import { useState } from 'react';
import styles from './TalentFollow.module.scss';

const TalentFollow = ({ data }) => {
  const [tabSelected, setTabSelected] = useState('follower');
  return (
    <div className={styles.root}>
      <div className={styles.tab}>
        <div
          className={clsx(styles.tab__item, {
            [styles.active]: tabSelected === 'follower',
          })}
        >
          <div
            className={styles.tab__content}
            onClick={() => setTabSelected('follower')}
          >
            Followers (10k)
          </div>
        </div>
        <div
          className={clsx(styles.tab__item, {
            [styles.active]: tabSelected === 'following',
          })}
        >
          <div
            className={styles.tab__content}
            onClick={() => setTabSelected('following')}
          >
            Following (23)
          </div>
        </div>
      </div>
      <div className={styles['tab-content']}>
        {follower.map((_f, i) => (
          <UserEntity key={i} {..._f} />
        ))}
      </div>

      <div className={styles.more}>
        <Link href={`/talents/${data.name}/follower`} replace passHref>
          <a>See All</a>
        </Link>
      </div>
    </div>
  );
};

export default TalentFollow;
