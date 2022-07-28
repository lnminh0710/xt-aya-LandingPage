import Link from 'next/link';
import { useEffect, useState } from 'react';
import styles from './style.module.scss';

const RecentNews = ({ dataSource, titleLength = 20 }) => {
  const [title, setTitle] = useState(dataSource.Title);
  useEffect(() => {
    if (title?.length > titleLength)
      setTitle(`${title.slice(0, titleLength)}...`);
  }, []);
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
              {title}
            </Link>
          )}
        </h4>
        <p>{dataSource.CreateDate}</p>
      </div>
    </div>
  );
};

export default RecentNews;
