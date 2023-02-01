import { ArrowLeft, ArrowRight } from 'assets/svg';
import { CloseQuoteIcon, OpenQuoteIcon } from 'assets/svg/quote';
import clsx from 'clsx';
import { useMatchQuery } from 'components/hook';
import { ImageLazyLoad } from 'components/own';
import { API_ENDPOINT, FILE_ENDPOINT } from 'constants/common';
import { map } from 'lodash';
import { get } from 'lodash';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { convertLanguageCode } from 'utils/convert';
import styles from './HomeTestimonials.module.scss';

const HomeTestimonials = () => {
  const [{ data, loading }, setState] = useState({ data: [], loading: true });
  const router = useRouter();
  const { locale } = router;

  const [currentIndex, setCurrentIndex] = useState(0);
  const { t } = useTranslation('home');
  const match = useMatchQuery();

  useEffect(() => {
    fetch(
      `${API_ENDPOINT}news/Testimonials?LoginLanguage=${convertLanguageCode(
        locale
      )}`
    )
      .then((res) => res.json())
      .then((response) => {
        setState({
          data: map(
            response,
            (_r) => JSON.parse(_r.SelectedLanguage || _r.DefaultLanguage)[0]
          ),
          loading: false,
        });
      })
      .catch(() => {
        setState({ data: [], loading: false });
      });
  }, [locale]);

  if (!data.length && !loading) return <></>;

  return (
    <div className={clsx('container-root', styles.root)}>
      {match && (
        <div className={clsx(styles.title, 'text-center mb-5')}>
          Testimonials
        </div>
      )}
      <div className={styles.banner}>
        <div className={styles.banner__background}>
          {match ? (
            <ImageLazyLoad
              src={'/images/home/testimonials-background-mobile.webp'}
              width={172}
              height={323}
              alt='background'
              layout='responsive'
              objectFit='cover'
            />
          ) : (
            <ImageLazyLoad
              src={'/images/home/testimonials-background.webp'}
              width={306}
              height={647}
              alt='background'
              layout='responsive'
              objectFit='cover'
            />
          )}
        </div>
        <div className={styles.banner__image}>
          {match ? (
            <ImageLazyLoad
              src={'/images/home/testimonials-image-mobile.webp'}
              width={314}
              height={386}
              alt='background'
              layout='responsive'
              objectFit='cover'
            />
          ) : (
            <ImageLazyLoad
              src={'/images/home/testimonials-image.webp'}
              width={464}
              height={648}
              alt='image'
              layout='responsive'
              objectFit='cover'
            />
          )}
        </div>
      </div>
      <div className={styles.content}>
        {!match && <div className={styles.title}>{t('Testimonials')}</div>}
        <div
          className={clsx(styles.comment, {
            'react-loading-skeleton': loading,
          })}
        >
          {!loading && !!data.length && (
            <div className={styles['open-quote']}>
              <OpenQuoteIcon />
            </div>
          )}
          <div className={clsx(styles.comment__text, {})}>
            {t(get(data, [currentIndex, 'NewsContent'], ''))}
          </div>
          {!loading && !!data.length && (
            <div className={clsx(styles['close-quote'])}>
              <CloseQuoteIcon />
            </div>
          )}
        </div>
        <div className={clsx(styles.profile, {})}>
          <div className={styles.avatar}>
            {loading ? (
              <div
                className={clsx(
                  'rounded-circle react-loading-skeleton',
                  styles.loading
                )}
              />
            ) : (
              <ImageLazyLoad
                className='rounded-circle'
                src={get(data, [currentIndex, 'Picture'], '').replace(
                  FILE_ENDPOINT,
                  ''
                )}
                width={72}
                height={72}
                alt={get(data, [currentIndex, 'Author'], '')}
                layout='fill'
                objectFit='cover'
              />
            )}
          </div>
          <div className={styles.user__name}>
            {loading && (
              <div className={clsx('react-loading-skeleton', styles.loading)} />
            )}
            {get(data, [currentIndex, 'Author'], '')}
          </div>
          <div className={styles.user__role}>
            {loading && (
              <div className={clsx('react-loading-skeleton', styles.loading)} />
            )}
            {get(data, [currentIndex, 'Teaser'], '')}
          </div>
          <div className={styles.action}>
            {loading ? (
              <div className={clsx('react-loading-skeleton', styles.loading)} />
            ) : !!data.length ? (
              <>
                <div
                  onClick={() =>
                    setCurrentIndex(
                      !currentIndex ? data.length - 1 : currentIndex - 1
                    )
                  }
                >
                  <ArrowLeft />
                </div>
                <div
                  onClick={() =>
                    setCurrentIndex(
                      currentIndex === data.length - 1 ? 0 : currentIndex + 1
                    )
                  }
                >
                  <ArrowRight />
                </div>
              </>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeTestimonials;
