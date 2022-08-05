import Link from 'next/link';
import newsCardVerticalNoDesStyles from './style.module.scss';

const NewsCardVerticalNoDes = ({ newsItem, imgHeight = 119 }) => {
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
              {newsItem.Title}
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
                {newsItem.Title}
              </Link>
            )}
          </h4>
        </div>
      </div>
    </div>
  );
};

export default NewsCardVerticalNoDes;
