import Link from 'next/link';
import { useEffect, useState } from 'react';
import newsCardVerticalStyles from './style.module.scss';

const NewsCardVertical = ({ newsItem, desLength = 110, t }) => {
  const [des, setDes] = useState(newsItem.Teaser);
  const [title, setTitle] = useState(newsItem.Title);
  useEffect(() => {
    const titleLength = 55;

    if (title?.length > titleLength)
      setTitle(`${title.slice(0, titleLength)}...`);
    if (des?.length > desLength) setDes(`${des.slice(0, desLength)}...`);
  }, []);
  return (
    <div className={newsCardVerticalStyles.newsCardVerticalWrapper}>
      {newsItem.CategroySlugURL && newsItem.SlugURL && (
        <Link
          href={`/news/${newsItem.CategroySlugURL}/${newsItem.SlugURL}`}
          title={newsItem.Title}
        >
          <div
            className={newsCardVerticalStyles.otherImg}
            style={{
              backgroundImage: `url(${newsItem.Picture})`,
            }}
          >
            <h4
              className={newsCardVerticalStyles.otherTitle}
              title={newsItem.Title}
            >
              <Link
                href={`/news/${newsItem.CategroySlugURL}/${newsItem.SlugURL}`}
              >
                {title}
              </Link>
            </h4>
          </div>
        </Link>
      )}
      <p>
        {des}{' '}
        {newsItem.CategroySlugURL && newsItem.SlugURL && (
          <Link href={`/news/${newsItem.CategroySlugURL}/${newsItem.SlugURL}`}>
            <a className='link-href purple'>{t('readMore')}</a>
          </Link>
        )}
      </p>
    </div>
  );
};

export default NewsCardVertical;
