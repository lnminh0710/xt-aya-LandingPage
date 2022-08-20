import NewsCardVertical from 'components/own/news/newsCardVertical/NewsCardVertical';
import NewsCardVerticalNoDes from 'components/own/news/newsCardVerticalNoDes/NewsCardVerticalNoDes';
import Link from 'next/link';
import topNewsStyle from './topNewsStyle.module.scss';

const NewsMain = ({ dataSource, t }) => {
  return (
    <div className={topNewsStyle.topNewsContainer}>
      <div className={`row ${topNewsStyle.banner}`}>
        <div className={`col-12 col-md-8 ${topNewsStyle.mainWrapper}`}>
          {dataSource?.length &&
            dataSource[0]?.CategroySlugURL &&
            dataSource[0]?.SlugURL && (
              <Link
                href={`/news/${dataSource[0].CategroySlugURL}/${dataSource[0].SlugURL}`}
                title={dataSource[0].Title}
              >
                <div
                  className={topNewsStyle.mainImg}
                  style={{
                    backgroundImage: `url(${dataSource[0].Picture})`,
                  }}
                >
                  <div className={topNewsStyle.textWrapper}>
                    <h4
                      className={topNewsStyle.mainTitle}
                      title={dataSource[0].Title}
                    >
                      <Link
                        href={`/news/${dataSource[0].CategroySlugURL}/${dataSource[0].SlugURL}`}
                      >
                        {dataSource[0].Title}
                      </Link>
                    </h4>
                    <p>
                      {dataSource[0].Teaser}
                      {/* <Link
                        href={`/news/${dataSource[0].CategroySlugURL}/${dataSource[0].SlugURL}`}
                      >
                        <span
                          className={`link-href purple ${topNewsStyle.readMore}`}
                        >
                          {t('readMore')}
                        </span>
                      </Link> */}
                    </p>
                  </div>
                </div>
              </Link>
            )}
        </div>
        <div className={`row col-12 col-md-4 ${topNewsStyle.subMainWrapper}`}>
          {dataSource?.length >= 3 &&
            [dataSource[1], dataSource[2]].map((news, index) => {
              return (
                <div
                  key={`subMainWrapper-${index}`}
                  className={`col-12 col-sm-6 col-md-12 ${topNewsStyle.subMainItem}`}
                >
                  <NewsCardVertical newsItem={news} t={t} />
                </div>
              );
            })}
        </div>
      </div>
      <div className={`row ${topNewsStyle.others}`}>
        {dataSource?.length > 3 &&
          dataSource.map((news, index) => {
            if (index < 3) return;
            return (
              <div
                key={`othersWrapper-${index}`}
                className={`col-12 col-sm-6 col-md-3 ${topNewsStyle.otherItem}`}
              >
                <NewsCardVerticalNoDes newsItem={news} t={t} />
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default NewsMain;
