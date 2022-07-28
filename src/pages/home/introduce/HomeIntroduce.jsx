import { PlayIcon } from 'assets/svg';
import clsx from 'clsx';
import { useMatchQuery } from 'components/hook';
import { ImageLazyLoad } from 'components/own';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import { useState } from 'react';
import styles from './HomeIntroduce.module.scss';

const HomeIntroduce = () => {
  const { t } = useTranslation('home');
  const [isShowVideo, showVideo] = useState(false);
  const matches = useMatchQuery();
  return (
    <div className={clsx('container-root', styles.root)}>
      <div className={styles.title}>{t('What is AYA')}?</div>
      {matches && (
        <div className={clsx(styles['sub-title'], 'mb-4')}>
          {t(
            'We are a crowdfunding platform for casting professionals, artists and creators. Connect with your fans and get paid for doing what you love!'
          )}
        </div>
      )}
      <div className={styles.content}>
        <div className={styles.backdrop}>
          {!matches && (
            <div className={styles['sub-title']}>
              {t(
                'We are a crowdfunding platform for casting professionals, artists and creators. Connect with your fans and get paid for doing what you love!'
              )}
            </div>
          )}
          <ImageLazyLoad
            src={'/images/home/intro-background.webp'}
            layout='responsive'
            width={1108}
            height={953}
            alt='gradient'
          />
        </div>
        <div className={styles['link-break']}>
          <ImageLazyLoad
            src={'/images/home/intro-gradient.webp'}
            layout='responsive'
            width={1725}
            height={175}
            alt='gradient'
          />
        </div>
        <div
          className={styles['video-container']}
          onClick={() => showVideo(true)}
        >
          <div className={styles['video-container__backdrop']}></div>
          {!isShowVideo ? (
            <>
              <ImageLazyLoad
                src={'/images/home/video-background.webp'}
                layout='responsive'
                width={988}
                height={550}
                alt='gradient'
              />
              <div className={styles['play-button']}>
                <PlayIcon />
              </div>
            </>
          ) : (
            <video autoPlay muted onEnded={() => showVideo(false)}>
              <source src='videos/AyaIntroVideo.mp4' />
            </video>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomeIntroduce;
