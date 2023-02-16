import { useEffect, useState } from 'react';
import { StarIcon } from 'assets/svg';
import axios from 'axios';
import clsx from 'clsx';
import { ImageLazyLoad } from 'components/own';
import { API_ENDPOINT, TALENT_URL } from 'constants/common';
import { talentDataMockup } from 'mockups/talents';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { parseKNumber } from 'utils/convert';
import styles from './AyaResult.module.scss';

const renderStar = (star) => (
  <div className={styles['user__star-contained']}>
    <StarIcon color={star >= 1 ? '#FFB951' : '#2C2B34'} />
    <StarIcon color={star >= 2 ? '#FFB951' : '#2C2B34'} />
    <StarIcon color={star >= 3 ? '#FFB951' : '#2C2B34'} />
    <StarIcon color={star >= 4 ? '#FFB951' : '#2C2B34'} />
    <StarIcon color={star === 5 ? '#FFB951' : '#2C2B34'} />
  </div>
);

const AyaResult = () => {
  const { t } = useTranslation(['aya']);
  const router = useRouter();
  const [data, setData] = useState([]);
  useEffect(() => {
    axios(API_ENDPOINT + 'top-8-aya').then((res) => {
      console.log(
        `Author:minh.lam , file: AyaResult.jsx , line 33 , axios , res`,
        res
      );
      setData(res);
    });
  }, []);

  return (
    <>
      <div className={styles.title}>
        {t('Follow our top AYA-patron creator')}
      </div>
      <div className={styles.description}>
        {t('and find out thousands of patrons that you will be love', {
          ns: 'aya',
        })}
      </div>
      <div className={styles.root}>
        {data.map((item, index) => (
          <Link
            key={index}
            href={
              TALENT_URL + item.SlugURL + '/patron' + '?lang=' + router.locale
            }
          >
            <div className={styles.user}>
              <div className={styles.user__avatar}>
                <ImageLazyLoad
                  src={item.ProfilePicture || '/images/post-default.webp'}
                  width={306}
                  height={360}
                  alt={item.DisplayName}
                />
              </div>
              <div className={styles.user__name}>
                <span>{item.DisplayName}</span>
              </div>
              <div className={styles.user__gender}>{item.JobPosition}</div>
              <div className={styles.user__star}>
                {renderStar(item.Rating)} {item.Rating || 0}/5
              </div>
              <div className={styles.user__follower}>
                {parseKNumber(item.Follower)} {t('Followers')}
              </div>
            </div>
          </Link>
        ))}
        <div className={styles.space}></div>
        <div className={styles.space}></div>
      </div>
      <div className={clsx(styles.title, styles['text--center'])}>
        {t('Who uses Aya?')}
      </div>
      <div className={clsx(styles.description, styles['text--center'])}>
        {t('Description_1')}
      </div>
      <div className={clsx(styles.title, styles['text--center'])}>
        {t(`Let's Aya us!`)}
      </div>
      <div className={clsx(styles.description, styles['text--center'])}>
        {t('Description_2')}
      </div>

      <div className={clsx(styles.title, styles['text--center'])}>
        {t('Aya FOR MUSICIANS and Creators-of-all-kinds')}
      </div>
      <div className={clsx(styles.description, styles['text--center'])}>
        {t('Description_3')}
      </div>
      <div className='my-5'></div>
    </>
  );
};

export default AyaResult;
