import { useEffect, useMemo, useState } from 'react';
import clsx from 'clsx';
import { ImageLazyLoad } from 'components/own';
import Slider from 'react-slick';

import styles from './HomeCompanyCasting.module.scss';
import Image from 'next/image';
import { useMatchQuery } from 'components/hook';

import { API_ENDPOINT } from 'constants/common';
import Link from 'next/link';

// const initialCompany = [
//   {
//     IdNews: 1,
//     Picture: '/images/home/company-1.png',
//     DirectURL: 'https://www.google.com/',
//   },
//   {
//     IdNews: 2,
//     Picture: '/images/home/company-2.png',
//     DirectURL: 'https://www.google.com/',
//   },
//   {
//     IdNews: 3,
//     Picture: '/images/home/company-3.png',
//     DirectURL: 'https://www.google.com/',
//   },
//   {
//     IdNews: 4,
//     Picture: '/images/home/company-4.png',
//     DirectURL: 'https://www.google.com/',
//   },
//   {
//     IdNews: 5,
//     Picture: '/images/home/company-5.png',
//     DirectURL: 'https://www.google.com/',
//   },
//   {
//     IdNews: 6,
//     Picture: '/images/home/company-6.png',
//     DirectURL: 'https://www.google.com/',
//   },
//   {
//     IdNews: 7,
//     Picture: '/images/home/company-7.png',
//     DirectURL: 'https://www.google.com/',
//   },
//   {
//     IdNews: 8,
//     Picture: '/images/home/company-8.png',
//     DirectURL: 'https://www.google.com/',
//   },
// ];

const CompanyCasting = () => {
  const [{ data, loading }, setState] = useState({
    data: [],
    loading: true,
  });

  useEffect(() => {
    fetch(API_ENDPOINT + 'LogoLink')
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
      speed: 2000,
      slidesToScroll: 1,
      touchMove: true,
      autoplay: true,
      cssEase: 'linear',
      autoplaySpeed: 2000,
      swipe: true,
      arrows: false,
    }),
    []
  );

  const match = useMatchQuery('(max-width:480px)');

  return (
    <div className={clsx(styles.root)}>
      <Slider {...settings} slidesToShow={Math.min(6, data.length)}>
        {data.map((_p, i) => (
          <div key={i} className={styles.item}>
            <Link href={_p.DirectURL || '#'} passHref>
              <a target='_blank'>
                <Image
                  src={_p.Picture}
                  width={match ? 130 : 269}
                  height={match ? 37 : 73.5}
                  alt={_p.Picture}
                  layout='responsive'
                  objectFit='contain'
                />
              </a>
            </Link>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default CompanyCasting;
