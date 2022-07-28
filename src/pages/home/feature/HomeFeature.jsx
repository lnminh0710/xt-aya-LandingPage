import clsx from 'clsx';
import { features } from 'mockups/home';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';
import styles from './HomeFeature.module.scss';

const Item = ({ t, description, Icon, title }) => {
  const [hover, setHover] = useState(false);
  return (
    <div
      className={styles.item}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div>
        <Icon color={hover ? '#fff' : '#9454FC'} />
      </div>
      <div>
        <div className={styles.item__title}>{t(title)}</div>
        <div className={styles.item__description}>{t(description)}</div>
      </div>
    </div>
  );
};

const HomeFeature = () => {
  const { t } = useTranslation('home');
  return (
    <div className={clsx('root-container', styles.root)}>
      <div className={styles.title}>{t('Features')}</div>
      <div className={styles.content}>
        {features.map((data, index) => (
          <Item t={t} key={index} {...data} />
        ))}
      </div>
    </div>
  );
};

export default HomeFeature;
