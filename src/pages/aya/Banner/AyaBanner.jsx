import { MagnifyingIcon } from 'assets/svg';
import { useMatchQuery } from 'components/hook';
import { ImageLazyLoad } from 'components/own';
import { TALENT_URL } from 'constants/common';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useRef } from 'react';
import styles from './AyaBanner.module.scss';

const Banner = () => {
  const { t } = useTranslation('common');
  const inputRef = useRef();
  const router = useRouter();
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
          <input
            type='text'
            ref={inputRef}
            placeholder={t('Search for Talents, Artists...')}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                router.push(TALENT_URL + 'aya?q=' + e.target.value);
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
    </div>
  );
};

export default Banner;
