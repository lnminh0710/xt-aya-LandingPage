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
      <p>
        {newsItem.Teaser}{' '}
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
