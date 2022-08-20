import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import styles from './style.module.scss';

const Terms = () => {
  const router = useRouter();
  const { locale, locales, defaultLocale } = router;
  const { t } = useTranslation('terms');

  return (
    <div className='custom-container'>
      <h1 className={`header-title ${styles.title}`}>{t('title')}</h1>
      <div className={styles.content}>
        <div
          dangerouslySetInnerHTML={{
            __html: t('content_2', { interpolation: { escapeValue: false } }),
          }}
        />
      </div>
    </div>
  );
};

export default Terms;
