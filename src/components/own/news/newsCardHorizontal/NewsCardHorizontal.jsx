import Link from 'next/link';
import { useEffect, useState } from 'react';
import newsCardHorizontalStyles from './style.module.scss';

const NewsCardHorizontal = ({
  dataSource,
  desLength = 110,
  titleLength = 55,
  t,
}) => {
  const [des, setDes] = useState(dataSource.Teaser || '');
  const [title, setTitle] = useState(dataSource.Title || '');
  useEffect(() => {
    if (title.length > titleLength)
      setTitle(`${title.slice(0, titleLength)}...`);
    if (des.length > desLength) setDes(`${des.slice(0, desLength)}...`);
  }, []);
  return (
    <div className={`row ${newsCardHorizontalStyles.newsItem}`}>
      <div className={`col-12 col-lg-4 ${newsCardHorizontalStyles.newsImg}`}>
        +
        {dataSource.CategroySlugURL && dataSource.SlugURL && (
          <Link
            href={`/news/${dataSource.CategroySlugURL}/${dataSource.SlugURL}`}
            title={dataSource.Title}
          >
            <div
              className={newsCardHorizontalStyles.bgImg}
              style={{
                backgroundImage: `url(${dataSource.Picture})`,
              }}
            ></div>
          </Link>
        )}
      </div>
      <div className={`col-12 col-lg-4 ${newsCardHorizontalStyles.newsTitle}`}>
        <p>
          {dataSource.CategroySlugURL && dataSource.SlugURL && (
            <Link
              href={`/news/${dataSource.CategroySlugURL}/${dataSource.SlugURL}`}
            >
              <a>{title}</a>
            </Link>
          )}
        </p>
        <p className={newsCardHorizontalStyles.postedDateText}>
          {new Date(dataSource.CreateDate).toLocaleString('fr-FR')}
        </p>
      </div>
      <div className={`col-12 col-lg-4 ${newsCardHorizontalStyles.newsDes}`}>
        {des}{' '}
        {dataSource.CategroySlugURL && dataSource.SlugURL && (
          <Link
            href={`/news/${dataSource.CategroySlugURL}/${dataSource.SlugURL}`}
          >
            <span className='link-href purple'>{t('readMore')}</span>
          </Link>
        )}
      </div>
    </div>
  );
};
export default NewsCardHorizontal;
