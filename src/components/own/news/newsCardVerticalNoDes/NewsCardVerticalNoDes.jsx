import Link from 'next/link';
import { useEffect, useState } from 'react';
import newsCardVerticalNoDesStyles from './style.module.scss';

const NewsCardVerticalNoDes = ({
  newsItem,
  titleLength = 55,
  imgHeight = 119,
}) => {
  const [title, setTitle] = useState(newsItem.Title);
  useEffect(() => {
    if (title?.length > titleLength)
      setTitle(`${title.slice(0, titleLength)}...`);
  }, []);
  return (
    <div className={`${newsCardVerticalNoDesStyles.newsCardVerticalWrapper}`}>
      <div className={`${newsCardVerticalNoDesStyles.hiddenPhone}`}>
        {newsItem.CategroySlugURL && newsItem.SlugURL && (
          <Link
            href={`/news/${newsItem.CategroySlugURL}/${newsItem.SlugURL}`}
            title={newsItem.Title}
          >
            <div
              className={`${newsCardVerticalNoDesStyles.otherImg}`}
              style={{
                backgroundImage: `url(${newsItem.Picture})`,
                height: `${imgHeight}px`,
              }}
            ></div>
          </Link>
        )}
        <h4
          className={newsCardVerticalNoDesStyles.otherTitle}
          title={newsItem.Title}
        >
          {newsItem.CategroySlugURL && newsItem.SlugURL && (
            <Link
              href={`/news/${newsItem.CategroySlugURL}/${newsItem.SlugURL}`}
            >
              {title}
            </Link>
          )}
        </h4>
      </div>
      <div className={`row ${newsCardVerticalNoDesStyles.hiddenTablet}`}>
        <div className='col-6'>
          {newsItem.CategroySlugURL && newsItem.SlugURL && (
            <Link
              href={`/news/${newsItem.CategroySlugURL}/${newsItem.SlugURL}`}
              title={newsItem.Title}
            >
              <div
                className={`${newsCardVerticalNoDesStyles.otherImg}`}
                style={{
                  backgroundImage: `url(${newsItem.Picture})`,
                  height: `${imgHeight}px`,
                }}
              ></div>
            </Link>
          )}
        </div>
        <div className='col-6'>
          <h4
            className={newsCardVerticalNoDesStyles.otherTitle}
            title={newsItem.Title}
          >
            {newsItem.CategroySlugURL && newsItem.SlugURL && (
              <Link
                href={`/news/${newsItem.CategroySlugURL}/${newsItem.SlugURL}`}
              >
                {title}
              </Link>
            )}
          </h4>
        </div>
      </div>
    </div>
  );
};

export default NewsCardVerticalNoDes;
