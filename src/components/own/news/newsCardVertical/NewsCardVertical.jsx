import Link from 'next/link';
import newsCardVerticalStyles from './style.module.scss';

const NewsCardVertical = ({ newsItem, t }) => {
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
                {newsItem.Title}
              </Link>
            </h4>
          </div>
        </Link>
      )}
      <div className={newsCardVerticalStyles.teaserWrapper}>
        <div
          className={`${newsCardVerticalStyles.teaser}`}
          title={newsItem.Teaser}
        >
          {newsItem.Teaser}
        </div>
        {newsItem.CategroySlugURL && newsItem.SlugURL && (
          <Link href={`/news/${newsItem.CategroySlugURL}/${newsItem.SlugURL}`}>
            <a
              className={`link-href purple ${newsCardVerticalStyles.readMore}`}
            >
              {t('readMore')}
            </a>
          </Link>
        )}
      </div>
    </div>
  );
};

export default NewsCardVertical;
