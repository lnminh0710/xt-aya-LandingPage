import NewsCardHorizontal from 'components/own/news/newsCardHorizontal/NewsCardHorizontal';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import NewsMain from 'pages/news/NewsMain';
import { useEffect, useState, useRef } from 'react';
import styles from './style.module.scss';
import {
  getNewsByCategory,
  getRecentsByCategory,
  getCategoryBySlug,
} from './service';
import { getLanguageKey } from 'constants/languages';
import { getArticlesFromResponse } from 'utils/article.uti';

const NewsCategory = () => {
  const router = useRouter();
  const { locale, locales, defaultLocale } = router;
  const { t } = useTranslation(['common', 'news']);
  const [cateSlug, setCateSlug] = useState('');
  const [categoryTitle, setCategoryTitle] = useState('');
  const [topNews, setTopNews] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [index, setIndex] = useState(1);
  const size = 5;

  const prevScrollY = useRef(0);
  const [loading, setLoading] = useState(false);
  const [noMoreData, setNoMoreData] = useState(false);

  useEffect(() => {
    setCateSlug('');
    setIndex(1);
    setLoading(false);
    setNoMoreData(false);
    const params = router.query;
    if (!params?.slugCategory) {
      return;
    }

    setCateSlug(params.slugCategory);
    getRecentsByCategory(getLanguageKey(locale), params.slugCategory).subscribe(
      (res) => {
        const data = getArticlesFromResponse(res?.response);
        if (!data?.length) {
          return;
        }

        setTopNews(data);
      },
      (err) => {
        console.log(err);
      }
    );
    getCategoryBySlug(getLanguageKey(locale), params.slugCategory).subscribe(
      (res) => {
        if (!res?.response?.length) {
          return;
        }
        setCategoryTitle(res.response[0].CategoryName);
      },
      (err) => {
        console.log(err);
      }
    );
    getNewsByCategoriesFunc(params.slugCategory, index, size);
  }, []);

  useEffect(() => {
    let isPause = false;
    if (loading && !isPause) return;

    const handleScroll = () => {
      if (
        window.scrollY + window.innerHeight >=
        document.documentElement.scrollHeight - 300
      ) {
        if (!loading && !noMoreData) {
          isPause = true;
          setLoading(true);
          const tempIndex = index + 1;
          setIndex(tempIndex);
          getNewsByCategoriesFunc(cateSlug, tempIndex, size);
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading, cateSlug, categoryData]);

  function getNewsByCategoriesFunc(slugCategory, index, size) {
    getNewsByCategory(
      getLanguageKey(locale),
      slugCategory,
      index,
      size
    ).subscribe(
      (res) => {
        const data = getArticlesFromResponse(res?.response);
        if (!data?.length) {
          setNoMoreData(true);
          setLoading(false);
          return;
        }

        if (index === 1) {
          setCategoryData(data);
          setLoading(false);
          return;
        }

        const tempData = [...categoryData];
        tempData.push(...data);
        setCategoryData(tempData);
        setLoading(false);
      },
      (err) => {
        setLoading(false);
        console.log(err);
      }
    );
  }
  return (
    <div className={`custom-container ${styles.newsWrapper}`}>
      <h1 className={`header-title ${styles.title}`}>{categoryTitle}</h1>
      <NewsMain dataSource={topNews} t={t} />
      <div className={styles.hotnewsWrapper}>
        {categoryData?.length &&
          categoryData.map((item, index) => {
            return (
              <div key={`category-${index}`} className={styles.hotnewsItem}>
                <NewsCardHorizontal
                  dataSource={item}
                  t={t}
                  bgColor={'#ffffff'}
                />
              </div>
            );
          })}
      </div>
      {loading && (
        <div style={{ textAlign: 'center', marginBottom: '45px' }}>
          <span className='spinner-border text-secondary' role='status'>
            <span className='visually-hidden'>Loading...</span>
          </span>
        </div>
      )}
    </div>
  );
};

export default NewsCategory;
