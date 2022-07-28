import { useTranslation } from 'next-i18next';
import styles from './style.module.scss';

const AboutUs = () => {
  const { t } = useTranslation('aboutus');
  return (
    <div className={`custom-container ${styles.aboutusWrapper}`}>
      <h1 className={`header-title ${styles.title}`}>{t('title')}</h1>
      <p className={styles.text}>{t('text_1')}</p>
      <div
        className={styles.bgImg}
        style={{ backgroundImage: `url(/images/aboutus/aboutus_1.png)` }}
      ></div>
      <p className={styles.text}>{t('text_2')}</p>
      <p className={styles.text}>{t('text_3')}</p>
      <div
        className={styles.bgImg}
        style={{ backgroundImage: `url(/images/aboutus/aboutus_2.png)` }}
      ></div>
    </div>
  );
};

export default AboutUs;
