import Link from 'next/link';
import styles from './style.module.scss';

const RecentNews = ({ dataSource }) => {
  return (
    <div className={`row ${styles.recentItem}`}>
      {dataSource.CategroySlugURL && dataSource.SlugURL && (
        <Link
          href={`/news/${dataSource.CategroySlugURL}/${dataSource.SlugURL}`}
          title={dataSource.Title}
        >
          <div
            className={`col-3 ${styles.recentImg}`}
            style={{
              backgroundImage: `url(${dataSource.Picture})`,
            }}
          ></div>
        </Link>
      )}
      <div className={`col-9 ${styles.recentBody}`}>
        <h4>
          {dataSource.CategroySlugURL && dataSource.SlugURL && (
            <Link
              href={`/news/${dataSource.CategroySlugURL}/${dataSource.SlugURL}`}
              title={dataSource.Title}
            >
              {dataSource.Title}
            </Link>
          )}
        </h4>
        <p>{new Date(dataSource.CreateDate).toLocaleString('fr-FR')}</p>
      </div>
    </div>
  );
};

export default RecentNews;
