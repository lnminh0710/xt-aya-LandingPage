import { CalendarIcon, PencilIcon } from 'assets/svg';
import OtherNews from 'components/own/news/otherNews/OtherNews';
import RecentNews from 'components/own/news/recentNews/RecentNews';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Button, FormControl, InputGroup } from 'react-bootstrap';
import { getNewsDetail, getRecentNews, getOtherNews } from './services';
import styles from './style.module.scss';
import { getLanguageKey } from 'constants/languages';
import { getArticlesFromResponse } from 'utils/article.uti';
import { useCallback } from 'react';

const NewsDetail = ({ data: d }) => {
  const router = useRouter();
  const { locale, locales, defaultLocale } = router;
  const { t } = useTranslation(['common', 'news']);
  const [data, setData] = useState({
    id: null,
    title: '',
    subTitle: '',
    imgSubject: '',
    author: '',
    postedTime: '',
    content: '',
  });
  const [recentPosts, setRecentPost] = useState([]);
  const [otherNews, setOtherNews] = useState([]);
  const [index, setIndex] = useState(1);
  const [idNews, setIdNews] = useState('');
  const [idCategory, setIdCategory] = useState('');
  const [showBtnLoadMore, setShowBtnLoadMore] = useState(true);
  const getRecentNewsFunc = useCallback(
    (idCategory, excludeId) => {
      getRecentNews(getLanguageKey(locale), idCategory, excludeId).subscribe(
        (res) => {
          const data = getArticlesFromResponse(res?.response);
          if (!data?.length) {
            return;
          }
          setRecentPost(data);
        },
        (err) => {
          console.log(err);
        }
      );
    },
    [locale]
  );
  const getOtherNewsFunc = useCallback(
    (idRepNewCategory, excludeId, nextIndex) => {
      getOtherNews(
        idRepNewCategory,
        getLanguageKey(locale),
        excludeId,
        nextIndex,
        3
      ).subscribe(
        (res) => {
          const data = getArticlesFromResponse(res?.response);
          if (!data?.length) {
            setShowBtnLoadMore(false);
            return;
          }

          if (nextIndex === 1) {
            setOtherNews(data);
            return;
          }
          const tempData = [...otherNews];
          tempData.push(...data);
          setOtherNews(tempData);
          if (data?.length < 3) setShowBtnLoadMore(false);
        },
        (err) => {
          console.log(err);
        }
      );
    },
    [locale, otherNews]
  );

  useEffect(() => {
    setIndex(1);
    setData(d);

    const id = d?.IdNews;
    const idCate = d?.IdRepNewsCategory;
    setIdNews(id);
    setIdCategory(idCate);
    getRecentNewsFunc(idCate, id);
    getOtherNewsFunc(idCate, id, index);
  }, [d, getOtherNewsFunc, getRecentNewsFunc, index]);

  function loadMoreNews() {
    const indexTemp = index + 1;
    setIndex(indexTemp);
    getOtherNewsFunc(idCategory, idNews, indexTemp);
  }
  return (
    <>
      {!!data?.IdNews && (
        <div className='custom-container'>
          <h1 className={`header-title ${styles.title}`}>{data.Title}</h1>
          <p className={styles.authorWrapper}>
            <span>
              <PencilIcon />
              <span className={styles.author}>
                {t('by', { ns: 'news' })} {data.Author}
              </span>
            </span>
            <span className={styles.seperate}>|</span>
            <span>
              <CalendarIcon />
              <span className={styles.postedTime}>
                {new Date(data.CreateDate).toLocaleString('fr-FR')}
              </span>
            </span>
          </p>
          <div className={styles.subTitle}>{data.Teaser}</div>
          <div
            className={styles.imgSubject}
            style={{ backgroundImage: `url(${data.Picture})` }}
          ></div>
          <div className={`row ${styles.content}`}>
            <div className={`col-12 col-lg-9 ${styles.text}`}>
              <div
                dangerouslySetInnerHTML={{
                  __html: data.NewsContent,
                }}
              />
            </div>
            <div className='col-12 col-lg-3'>
              {/* <InputGroup className={styles.searchWrapper}>
                <FormControl
                  className={styles.searchInput}
                  placeholder={t('findSth', { ns: 'news' })}
                  aria-label='Find Something...'
                  aria-describedby='find-something'
                />
                <Button
                  className={`btn-aya purple ${styles.btnCustom}`}
                  variant='outline-secondary'
                  id='find-something'
                >
                  {t('search', { ns: 'news' })}
                </Button>
              </InputGroup> */}
              {!!recentPosts?.length && (
                <>
                  <h4 className={styles.recentTitle}>
                    {t('recentPost', { ns: 'news' })}
                  </h4>
                  <div className={`row m-0 ${styles.recentList}`}>
                    {!!recentPosts?.length &&
                      recentPosts.map((item, index) => {
                        return (
                          <div
                            key={`item-${index}`}
                            className='col-12 col-sm-6 col-md-4 col-lg-12'
                          >
                            <RecentNews
                              key={`recent-${index}`}
                              dataSource={item}
                            />
                          </div>
                        );
                      })}
                  </div>
                </>
              )}
            </div>
          </div>
          {!!otherNews?.length && (
            <>
              <hr className={styles.hrStytle} />
              <h4 className={styles.otherNewsTitle}>
                {t('otherNews', { ns: 'news' })}
              </h4>

              <OtherNews otherNewsList={otherNews} t={t} />

              {showBtnLoadMore && (
                <div className={styles.btnWrapper}>
                  <button className='btn-aya purple' onClick={loadMoreNews}>
                    {t('moreNews', { ns: 'news' })}
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </>
  );
};

export default NewsDetail;
