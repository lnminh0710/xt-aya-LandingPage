import { StarIcon } from 'assets/svg';
import clsx from 'clsx';
import { ImageLazyLoad } from 'components/own';
import { TALENT_URL } from 'constants/common';
import { talentDataMockup } from 'mockups/talents';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
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
  return (
    <>
      <div className={styles.title}>{t('Follow our top AYA patron')}</div>
      <div className={styles.description}>
        {t('and find out thousands of patrons that you will be love', {
          ns: 'aya',
        })}
      </div>
      <div className={styles.root}>
        {talentDataMockup.map((data, index) => (
          <Link key={index} href={TALENT_URL + 'lam-vissay/patron'}>
            <div className={styles.user}>
              <div className={styles.user__avatar}>
                <ImageLazyLoad
                  src={data.avatar}
                  width={306}
                  height={360}
                  alt={data.name}
                />
              </div>
              <div className={styles.user__name}>
                <span>{data.name}</span>
              </div>
              <div className={styles.user__gender}>
                {data.gender} • {data.country}
              </div>
              <div className={styles.user__star}>
                {renderStar(data.rating)} {data.rating}/5
              </div>
              <div className={styles.user__follower}>
                {parseKNumber(data.follower)} Followers
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
