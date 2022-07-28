import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import Slider from 'react-slick';

import styles from './HomeReferences.module.scss';
import {
  ArrowCircleLeft,
  ArrowCircleRight,
  CaretLeftIcon,
  CaretRightIcon,
  DotIcon,
} from 'assets/svg';
import { useRef } from 'react';
import { useMatchQuery } from 'components/hook';
import { useTranslation } from 'next-i18next';
import { API_ENDPOINT } from 'constants/common';
import clsx from 'clsx';
import Link from 'next/link';

// const initialData = [
//   {
//     IdNews: 1,
//     Picture: 'https://bilutv.link/film/4520/poster.jpg',
//     DirectURL: 'https://www.google.com/',
//   },
//   {
//     IdNews: 2,
//     Picture: 'https://bilutv.link/film/19417/poster.jpg?v=1651989975',
//     DirectURL: 'https://www.google.com/',
//   },
//   {
//     IdNews: 3,
//     Picture: 'https://bilutv.link/film/19502/poster.jpg?v=1641573222',
//     DirectURL: 'https://www.google.com/',
//   },
//   {
//     IdNews: 4,
//     Picture: 'https://bilutv.link/film/19058/poster.jpg?v=1647443269',
//     DirectURL: 'https://www.google.com/',
//   },
//   {
//     IdNews: 5,
//     Picture: 'https://bilutv.link/film/18272/poster.jpg',
//     DirectURL: 'https://www.google.com/',
//   },
//   {
//     IdNews: 6,
//     Picture: 'https://bilutv.link/film/19047/poster.jpg',
//     DirectURL: 'https://www.google.com/',
//   },
//   {
//     IdNews: 7,
//     Picture: 'https://bilutv.link/film/12888/poster.jpg',
//     DirectURL: 'https://www.google.com/',
//   },
//   {
//     IdNews: 8,
//     Picture: 'https://bilutv.link/film/15373/poster.jpg',
//     DirectURL: 'https://www.google.com/',
//   },
//   {
//     IdNews: 9,
//     Picture: 'https://bilutv.link/film/12726/poster.jpg',
//     DirectURL: 'https://www.google.com/',
//   },
//   {
//     IdNews: 10,
//     Picture: 'https://bilutv.link/film/8663/poster.jpg',
//     DirectURL: 'https://www.google.com/',
//   },
//   {
//     IdNews: 11,
//     Picture: 'https://bilutv.link/film/8875/poster.jpg',
//     DirectURL: 'https://www.google.com/',
//   },
//   {
//     IdNews: 12,
//     Picture: 'https://bilutv.link/film/15970/poster.jpg',
//     DirectURL: 'https://www.google.com/',
//   },
//   {
//     IdNews: 13,
//     Picture: 'https://bilutv.link/film/5923/poster.jpg',
//     DirectURL: 'https://www.google.com/',
//   },
//   {
//     IdNews: 14,
//     Picture: 'https://bilutv.link/film/10979/poster.jpg',
//     DirectURL: 'https://www.google.com/',
//   },
//   {
//     IdNews: 15,
//     Picture: 'https://bilutv.link/film/5859/poster.jpg',
//     DirectURL: 'https://www.google.com/',
//   },
// ];

function ArrowLeft(props) {
  const { onClick } = props;
  return (
    <div className={styles['slider-arrow__left']} onClick={onClick}>
      <CaretLeftIcon />
    </div>
  );
}

function ArrowRight(props) {
  const { onClick } = props;
  return (
    <div className={styles['slider-arrow__right']} onClick={onClick}>
      <CaretRightIcon />
    </div>
  );
}

const HomeReferences = () => {
  const [{ data, loading }, setState] = useState({
    data: [],
    loading: true,
  });
  const ref = useRef(null);
  const { t } = useTranslation('home');
  const [currentDot, setCurrentDot] = useState(0);
  const matchSize5 = useMatchQuery('(max-width:2310px)');
  const matchSize3 = useMatchQuery('(max-width:1650px)');

  useEffect(() => {
    fetch(API_ENDPOINT + 'PosterLink')
      .then((res) => res.json())
      .then((response) => {
        setState({ data: response, loading: false });
      })
      .catch(() => {
        setState({ data: [], loading: false });
      });
  }, []);

  const settings = useMemo(
    () => ({
      className: styles['setting-slider'],
      dots: false,
      infinite: true,
      variableWidth: true,
      touchThreshold: 100,
      speed: 500,
      slidesToShow: 5,
      touchMove: true,
      swipeToSlide: true,
      centerMode: true,
      autoplay: false,
      pauseOnHover: true,
      autoplaySpeed: 3000,
      swipe: true,
      arrows: true,
      nextArrow: <ArrowLeft />,
      prevArrow: <ArrowRight />,
      afterChange: (current) => setCurrentDot(current),
      responsive: [
        {
          breakpoint: 990,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
          },
        },
        {
          breakpoint: 768,
          settings: {
            arrows: false,
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ],
    }),
    []
  );

  const dots = useMemo(() => {
    const total = matchSize3 ? 3 : matchSize5 ? 5 : 7;
    const result = [];
    for (let index = 0; index < data.length; index++) {
      if (index % total === 0) {
        result.push(index);
        continue;
      }
    }

    return result;
  }, [data.length, matchSize3, matchSize5]);

  return (
    <div className='container-root'>
      <div className={styles.title}>{t('Selected References')}</div>
      {loading ? (
        <div className={styles['slide-skeleton']}>
          <div className={clsx('react-loading-skeleton', styles.item)} />
          <div className={clsx('react-loading-skeleton', styles.item)} />
          <div className={clsx('react-loading-skeleton', styles.item)} />
          <div className={clsx('react-loading-skeleton', styles.item)} />
          <div className={clsx('react-loading-skeleton', styles.item)} />
        </div>
      ) : (
        <div className={styles.slide}>
          <Slider {...settings} ref={ref}>
            {data.map((_p, i) => (
              <div key={i}>
                <Link href={_p.DirectURL || '#'} passHref>
                  <a target='_blank'>
                    <div className={styles.item}>
                      <Image
                        src={_p.Picture}
                        width={300}
                        height={450}
                        alt={_p.Picture}
                        layout='responsive'
                        objectFit='cover'
                        className={styles.item__image}
                      />
                    </div>
                  </a>
                </Link>
              </div>
            ))}
          </Slider>
        </div>
      )}
      <div className={'d-none'}>
        <div
          onClick={() => {
            ref.current.slickPrev();
          }}
        >
          <ArrowCircleLeft />
        </div>
        <div className={styles.dots}>
          {dots.map((_d, index) => (
            <div
              key={index}
              onClick={() => {
                ref.current.slickGoTo(_d);
              }}
            >
              <DotIcon color={_d === currentDot ? '#674F82' : '#D9D9D9'} />
            </div>
          ))}
        </div>
        <div
          onClick={() => {
            ref.current.slickNext();
          }}
        >
          <ArrowCircleRight />
        </div>
      </div>
    </div>
  );
};

export default HomeReferences;
