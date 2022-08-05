import Link from 'next/link';
import newsCardHorizontalStyles from './style.module.scss';

const NewsCardHorizontal = ({ dataSource, t }) => {
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
              <a>{dataSource.Title}</a>
            </Link>
          )}
        </p>
        <p className={newsCardHorizontalStyles.postedDateText}>
          {new Date(dataSource.CreateDate).toLocaleString('fr-FR')}
        </p>
      </div>
      <div className={`col-12 col-lg-4 ${newsCardHorizontalStyles.newsDes}`}>
        {dataSource.Teaser}{' '}
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
