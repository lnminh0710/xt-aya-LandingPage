import { MagnifyingIcon } from 'assets/svg';
import { TALENT_URL } from 'constants/common';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { useRef } from 'react';
import styles from './HomeBanner.module.scss';

const HomeBanner = ({}) => {
  const { t } = useTranslation('common');
  const inputRef = useRef();
  const router = useRouter();
  return (
    <div className={styles.root}>
      <div className={styles.gradient1}></div>
      <video autoPlay loop muted>
        <source src='/videos/AyaTeaser.mp4' />
      </video>
      <div className={styles.gradient2}></div>

      <div className={styles['search-box']}>
        <MagnifyingIcon />
        <input
          type='text'
          ref={inputRef}
          placeholder={t('Search for Talents, Artists...')}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              router.push(TALENT_URL + 'search?q=' + e.target.value);
            }
          }}
        />
        <div
          className={styles['search-button']}
          onClick={() =>
            router.push(TALENT_URL + 'search?q=' + inputRef.current.value)
          }
        >
          {t('Search')}
        </div>
      </div>
    </div>
  );
};

export default HomeBanner;
