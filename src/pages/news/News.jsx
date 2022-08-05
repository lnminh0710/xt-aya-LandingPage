import NewsCardHorizontal from 'components/own/news/newsCardHorizontal/NewsCardHorizontal';
import NewsCardVerticalNoDes from 'components/own/news/newsCardVerticalNoDes/NewsCardVerticalNoDes';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import NewsMain from './NewsMain';
import styles from './style.module.scss';
import {
  getRecents,
  getHightLight,
  getCategories,
  getNewsByCategory,
} from './service';
import { getLanguageKey } from 'constants/languages';
import { useRouter } from 'next/router';
import { getArticlesFromResponse } from 'utils/article.uti';

const News = () => {
  const router = useRouter();
  const { locale, locales, defaultLocale } = router;
  const { t } = useTranslation(['common', 'news']);
  const [topNews, setTopNews] = useState([]);
  const [hotNews, setHotNews] = useState([]);

  const [firstNewsByCategory, setFirstNewsByCategory] = useState({});
  const [otherNewsByCategory, setOtherNewsByCategory] = useState([]);

  useEffect(() => {
    getCategories(getLanguageKey(locale)).subscribe(
      (res) => {
        if (!res?.response?.length) {
          return;
        }

        getNewsByCategories(res.response);
      },
      (error) => {
        console.log(error);
      }
    );
    getRecents(getLanguageKey(locale)).subscribe(
      (res) => {
        const data = getArticlesFromResponse(res?.response);
        if (!data?.length) {
          return;
        }

        setTopNews(data);
      },
      (error) => {
        console.log(error);
      }
    );

    getHightLight(getLanguageKey(locale)).subscribe(
      (res) => {
        const data = getArticlesFromResponse(res?.response);
        if (!data?.length) {
          return;
        }

        setHotNews(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }, []);

  function getNewsByCategories(tmpCates) {
    if (!tmpCates?.length) {
      return;
    }

    const firstCategory = tmpCates[0];
    getNewsByCategory(
      firstCategory.SlugURL,
      getLanguageKey(locale),
      1,
      4
    ).subscribe(
      (res) => {
        const data = getArticlesFromResponse(res?.response);
        if (!data?.length) {
          return;
        }
        setFirstNewsByCategory({
          slug: firstCategory.SlugURL,
          cateName: firstCategory.TextValue,
          data: data,
        });
      },
      (error) => {
        console.log(error);
      }
    );

    if (tmpCates?.length < 2) return;

    const tmpOtherNewsByCategory = [];
    for (let index = 1; index < tmpCates.length; index++) {
      const element = tmpCates[index];
      getNewsByCategory(
        element.SlugURL,
        getLanguageKey(locale),
        1,
        4
      ).subscribe(
        (res) => {
          const isLastItem = index === tmpCates.length - 1;
          const data = getArticlesFromResponse(res?.response);

          if (!data?.length) {
            if (isLastItem) setOtherNewsByCategory(tmpOtherNewsByCategory);
            return;
          }

          tmpOtherNewsByCategory.push({
            slug: element.SlugURL,
            cateName: element.TextValue,
            data: data,
          });

          if (isLastItem) setOtherNewsByCategory(tmpOtherNewsByCategory);
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }
  return (
    <div className={`custom-container ${styles.newsWrapper}`}>
      <h1 className={`header-title ${styles.title}`}>
        {t('title', { ns: 'news' })}
      </h1>
      <NewsMain dataSource={topNews} t={t} />
      {firstNewsByCategory && (
        <div className={styles.categoryWrapper}>
          <div className={styles.CateItem}>
            <h2 className={styles.header}>
              <span className={styles.haederText}>
                <span className={styles.text}>
                  {firstNewsByCategory?.cateName}
                </span>
              </span>
              {firstNewsByCategory?.slug && (
                <Link href={`/news/${firstNewsByCategory?.slug}`}>
                  <span className={`link-href purple ${styles.seeAll}`}>
                    {t('seeAll')}
                  </span>
                </Link>
              )}
            </h2>
            <div className={`row  ${styles.categoryList}`}>
              {firstNewsByCategory?.data?.length &&
                firstNewsByCategory?.data?.map((item, index) => {
                  return (
                    <div
                      key={`category1Wrapper-${index}`}
                      className={`col-12 col-lg-3 ${item.categoryItem}`}
                    >
                      <NewsCardVerticalNoDes newsItem={item} imgHeight={214} />
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      )}
      <div className={styles.hotNewsWrapper}>
        <h1 className={styles.highlightText}>
          <span className={styles.text}>{t('highlight', { ns: 'news' })}</span>
        </h1>
        <div className={styles.hotnewsWrapper}>
          {hotNews?.length &&
            hotNews.map((item, index) => {
              return (
                <div key={`hotnews-${index}`} className={styles.hotnewsItem}>
                  <NewsCardHorizontal dataSource={item} t={t} />
                </div>
              );
            })}
        </div>
      </div>
      <div className={styles.categoryWrapper}>
        {otherNewsByCategory?.length &&
          otherNewsByCategory.map((newsCatesItem, newsCatesIndex) => {
            return (
              <div
                key={`newsCates-${newsCatesIndex}`}
                className={styles.CateItem}
              >
                <h2 className={styles.header}>
                  <span className={styles.haederText}>
                    <span className={styles.text}>
                      {newsCatesItem?.cateName}
                    </span>
                  </span>
                  {newsCatesItem?.slug && (
                    <Link href={`/news/${newsCatesItem?.slug}`}>
                      <span className={`link-href purple ${styles.seeAll}`}>
                        {t('seeAll')}
                      </span>
                    </Link>
                  )}
                </h2>
                <div className={`row`}>
                  {newsCatesItem?.data?.length &&
                    newsCatesItem?.data?.map((item, index) => {
                      return (
                        <div
                          key={`category2Wrapper-${index}`}
                          className={`col-12 col-lg-3 ${item.categoryItem}`}
                        >
                          <NewsCardVerticalNoDes
                            newsItem={item}
                            imgHeight={214}
                          />
                        </div>
                      );
                    })}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default News;
