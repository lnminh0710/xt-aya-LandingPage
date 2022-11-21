import axios from 'axios';
import { ImageLazyLoad } from 'components/own';
import { API_ENDPOINT } from 'constants/common';
import produce from 'immer';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { castingList } from 'pages/casting-detail/mockup';
import { useEffect } from 'react';
import { useState } from 'react';
import { convertLanguageCode } from 'utils/convert';
import { CastingItem } from '../item';

import styles from './CastingList.module.scss';

const initialState = {
  list: castingList,
  recent: castingList,
  loading: false,
};

const CastingList = () => {
  const [{ list, recent, loading }, setState] = useState(initialState);
  const router = useRouter();
  const { locale } = router;

  useEffect(() => {
    axios
      .get(
        `${API_ENDPOINT}casting/jobs?LoginLanguage=${convertLanguageCode(
          locale
        )}`
      )
      .then((res) => {
        setState(
          produce((draft) => {
            draft.list = res;
          })
        );
      });
  }, [locale]);

  return (
    <div className={styles.root}>
      <div className={styles['title']}>OPEN CASTING JOBS</div>
      <div className={styles.content}>
        <div className={styles.list}>
          {list.map((item, i) => (
            <CastingItem key={i} data={item} />
          ))}
        </div>
        {/* <div className={styles['recent-list']}>
          <div className={styles['recent-title']}>Recent casting jobs</div>
          {recent.map((_r, i) => (
            <Link href={'/casting/' + _r.Link || '#'} key={i} passHref>
              <a className={styles['casting-item']} target='_blank'>
                <div className={styles['recent-item']}>
                  <ImageLazyLoad
                    src={_r.Image}
                    alt={_r.Title}
                    width={70}
                    height={70}
                  />
                  <div className={styles['recent-item__info']}>
                    <div className={styles['recent-item__title']}>
                      {_r.Title}
                    </div>
                    <div className={styles['recent-item__date']}>
                      {_r.ExpireDate}
                    </div>
                  </div>
                </div>
              </a>
            </Link>
          ))}
        </div> */}
      </div>
    </div>
  );
};

export default CastingList;
