import { MagnifyingIcon } from 'assets/svg';
import { useTranslation } from 'next-i18next';
import styles from './HomeBanner.module.scss';

const HomeBanner = ({}) => {
  const { t } = useTranslation('common');
  return (
    <div className={styles.root}>
      <div className={styles.gradient1}></div>
      <video autoPlay loop muted>
        <source src='/videos/AyaTeaser.mp4' />
      </video>
      <div className={styles.gradient2}></div>

      <div className={styles['search-box']}>
        <MagnifyingIcon />
        <input type='text' placeholder={t('Search for Talents, Artists...')} />
        <div className={styles['search-button']}>{t('Search')}</div>
      </div>
    </div>
  );
};

export default HomeBanner;
