import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import PackagePrice from './PackagePrice';
import styles from './style.module.scss';

const Price = () => {
  const { t } = useTranslation('price');
  const [artistPackage, setArtistPackage] = useState([]);

  useEffect(() => {
    const data = [
      {
        id: 1,
        name: t('pro'),
        price: t('proPrice'),
        outStanding: true,
        urlJoin: '#',
        data: [
          {
            id: 1,
            isCheck: true,
            content: '',
            permissionName: t('eprofile'),
            permissionDes: t('eprofile'),
          },
          {
            id: 2,
            isCheck: true,
            content: '',
            permissionName: t('ranking'),
            permissionDes: t('ranking'),
          },
          {
            id: 3,
            isCheck: false,
            content: '20',
            permissionName: t('photoOnEProfile'),
            permissionDes: t('photoOnEProfile'),
          },
          {
            id: 4,
            isCheck: false,
            content: '3',
            permissionName: t('teaserPhoto'),
            permissionDes: t('teaserPhoto'),
          },
          {
            id: 5,
            isCheck: false,
            content: '10',
            permissionName: t('externalLink'),
            permissionDes: t('externalLink'),
          },
          {
            id: 6,
            isCheck: true,
            content: '',
            permissionName: t('showreel'),
            permissionDes: t('showreel'),
          },
          {
            id: 7,
            isCheck: true,
            content: '',
            permissionName: t('updateShowreel'),
            permissionDes: t('updateShowreel'),
          },
          {
            id: 8,
            isCheck: true,
            content: '',
            permissionName: t('aboutMeVideo'),
            permissionDes: t('aboutMeVideo'),
          },
          {
            id: 9,
            isCheck: true,
            content: '',
            permissionName: t('searchCastDirector'),
            permissionDes: t('searchCastDirector'),
          },
          {
            id: 10,
            isCheck: true,
            content: '',
            permissionName: t('messaging'),
            permissionDes: t('messaging'),
          },
          {
            id: 11,
            isCheck: true,
            content: '',
            permissionName: t('castingLetter'),
            permissionDes: t('castingLetter'),
          },
          {
            id: 12,
            isCheck: true,
            content: '',
            permissionName: t('analyticsTools'),
            permissionDes: t('analyticsTools'),
          },
          {
            id: 13,
            isCheck: true,
            content: '',
            permissionName: t('webCard'),
            permissionDes: t('webCard'),
          },
          {
            id: 14,
            isCheck: true,
            content: '',
            permissionName: t('onlineShop'),
            permissionDes: t('onlineShop'),
          },
        ],
      },
      {
        id: 2,
        name: t('free'),
        price: t('freePrice'),
        outStanding: false,
        urlJoin: '#',
        data: [
          {
            id: 1,
            isCheck: true,
            content: '',
            permissionName: t('eprofile'),
            permissionDes: t('eprofile'),
          },
          {
            id: 2,
            isCheck: false,
            content: '',
            permissionName: t('ranking'),
            permissionDes: t('ranking'),
          },
          {
            id: 3,
            isCheck: false,
            content: '5',
            permissionName: t('photoOnEProfile'),
            permissionDes: t('photoOnEProfile'),
          },
          {
            id: 4,
            isCheck: false,
            content: '',
            permissionName: t('teaserPhoto'),
            permissionDes: t('teaserPhoto'),
          },
          {
            id: 5,
            isCheck: false,
            content: '',
            permissionName: t('externalLink'),
            permissionDes: t('externalLink'),
          },
          {
            id: 6,
            isCheck: false,
            content: '',
            permissionName: t('showreel'),
            permissionDes: t('showreel'),
          },
          {
            id: 7,
            isCheck: false,
            content: '',
            permissionName: t('updateShowreel'),
            permissionDes: t('updateShowreel'),
          },
          {
            id: 8,
            isCheck: false,
            content: '',
            permissionName: t('aboutMeVideo'),
            permissionDes: t('aboutMeVideo'),
          },
          {
            id: 9,
            isCheck: false,
            content: '',
            permissionName: t('searchCastDirector'),
            permissionDes: t('searchCastDirector'),
          },
          {
            id: 10,
            isCheck: false,
            content: '',
            permissionName: t('messaging'),
            permissionDes: t('messaging'),
          },
          {
            id: 11,
            isCheck: false,
            content: '',
            permissionName: t('castingLetter'),
            permissionDes: t('castingLetter'),
          },
          {
            id: 12,
            isCheck: false,
            content: '',
            permissionName: t('analyticsTools'),
            permissionDes: t('analyticsTools'),
          },
          {
            id: 13,
            isCheck: false,
            content: '',
            permissionName: t('webCard'),
            permissionDes: t('webCard'),
          },
          {
            id: 14,
            isCheck: false,
            content: '',
            permissionName: t('onlineShop'),
            permissionDes: t('onlineShop'),
          },
        ],
      },
    ];
    setArtistPackage(data);
  }, []);
  return (
    <div className='custom-container'>
      <h1 className={`header-title ${styles.customHeader}`}>{t('title')}</h1>
      {/* <p className={styles.subTitle}>
        {t('subTitle_1')}
        <br />
        {t('subTitle_2')}
      </p> */}
      <PackagePrice title={t('packageTitle')} packageList={artistPackage} />
    </div>
  );
};

export default Price;
