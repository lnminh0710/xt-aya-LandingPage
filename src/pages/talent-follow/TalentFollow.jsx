import { useState } from 'react';
import Link from 'next/link';
import clsx from 'clsx';

import { ImageLazyLoad, UserEntity } from 'components/own';

import { follower as mockupData } from 'mockups/talent';
import styles from './TalentFollow.module.scss';
import { ChevronLeft } from 'assets/svg';
import { useEffect } from 'react';
import produce from 'immer';
import { useCallback } from 'react';

const loadingSkeleton = [1, 2, 3, 4, 5, 6, 7, 8];
const initialState = {
  list: [],
  hasMore: false,

  tabSelected: 'follower',

  loading: true,

  follower: {
    data: [],
    total: 0,
  },

  following: {
    data: [],
    total: 0,
  },
};

const TalentFollow = ({ data }) => {
  const [{ list, loading, tabSelected, follower, following }, setState] =
    useState(initialState);

  useEffect(() => {
    setTimeout(() => {
      setState(
        produce((draft) => {
          draft.list = mockupData;
          draft.loading = false;
        })
      );
    }, 300);
  }, []);

  const setTabSelected = useCallback((tab) => {
    setState(
      produce((draft) => {
        draft.tabSelected = tab;
      })
    );
  }, []);

  return (
    <div className={styles.root}>
      <Link href={`/talents/${data.name}`} passHref>
        <a>
          <div className={styles.breadcrumb}>
            <div>
              <ChevronLeft />
            </div>
            <div className={styles.avatar}>
              <ImageLazyLoad
                className='rounded-circle'
                src={'/images/will_removed/Image.webp'}
                width={72}
                height={72}
                alt={'LamVissay'}
                layout='fill'
                objectFit='cover'
              />
            </div>
            <div className={styles.name}>Lâm Vissay’s Profile</div>
          </div>
        </a>
      </Link>
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
        {list.map((_f, i) => (
          <UserEntity key={i} {..._f} />
        ))}
        {loading &&
          loadingSkeleton.map((_f, i) => <UserEntity key={i} loading />)}
      </div>

      <div className={styles.more}>
        <Link href={`/talents/${data.name}/follower`} replace passHref>
          <a>Load more</a>
        </Link>
      </div>
    </div>
  );
};

export default TalentFollow;
