import { useMatchQuery } from 'components/hook';
import { ImageLazyLoad } from 'components/own';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import styles from './NotFound.module.scss';

const NotFound = () => {
  const match = useMatchQuery();
  const { t } = useTranslation('common');
  return (
    <div className={styles.root}>
      <div className={styles.content}>
        <div className={styles.banner}>404!</div>
        <div className={styles.title}>
          <div className='me-2'> Ooops!</div> {t('Page not found!')}
        </div>
        <div className={styles['sub-title']}>
          {t('This page doesn’t exist or was removed!')}
        </div>
        <div className={styles['sub-title']}>
          {t('We suggest you back to home')}
        </div>
        {!match && (
          <Link href='/' passHref>
            <div className={styles.button}>{t('Back to home')}</div>
          </Link>
        )}
      </div>
      <div>
        <ImageLazyLoad
          src={'/images/404.webp'}
          alt='404'
          width={526}
          height={417}
        />
      </div>
      {match && (
        <Link href='/' passHref>
          <div className={styles.button}>{t('Back to home')}</div>
        </Link>
      )}
    </div>
  );
};

export default NotFound;
