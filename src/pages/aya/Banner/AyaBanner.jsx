import { MagnifyingIcon } from 'assets/svg';
import { useMatchQuery } from 'components/hook';
import { ImageLazyLoad } from 'components/own';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import styles from './AyaBanner.module.scss';

const Banner = () => {
  const { t } = useTranslation('common');
  const match = useMatchQuery();
  return (
    <div className={styles.root}>
      <Image
        className={styles.banner__image}
        src='/images/aya/Banner.webp'
        width={match ? 390 : 1728}
        height={300}
        layout='responsive'
        objectFit='cover'
        alt='banner-talent'
      />

      <div className={styles.content}>
        <div className={styles.title}>
          {t('Find your AYA patron you already love!')}
        </div>
        <div className={styles['search-box']}>
          <MagnifyingIcon />
          <input type='text' placeholder={t('Search for Ayas, Artists...')} />
          <div className={styles['search-button']}>{t('Search')}</div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
