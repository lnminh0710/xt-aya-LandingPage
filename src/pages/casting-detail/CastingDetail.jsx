import { CalendarIcon, PencilIcon } from 'assets/svg';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Button, FormControl, InputGroup } from 'react-bootstrap';
import {
  getCastingDetail,
  getRecentCasting,
  getOtherCasting,
} from './services';
import styles from './style.module.scss';
import { getLanguageKey } from 'constants/languages';
import { getArticlesFromResponse } from 'utils/article.uti';
import { castingList, mockupCasting } from './mockup';
import { get } from 'lodash';
import Link from 'next/link';
import { ImageLazyLoad } from 'components/own';
import clsx from 'clsx';
import { useCallback } from 'react';
import { useUserInfo } from 'components/hook/useContextSelector';

const CastingDetail = () => {
  const router = useRouter();
  const userInfo = useUserInfo();
  const { locale } = router;
  const { t } = useTranslation('casting');
  const [data, setData] = useState(null);
  const [recentPosts, setRecentPost] = useState([]);
  const [index, setIndex] = useState(1);

  const applyJob = useCallback(() => {}, []);

  useEffect(() => {
    setIndex(1);
    const params = router.query;
    if (!params?.slug) {
      return;
    }

    function getRecentCastingFunc(idCategory, excludeId) {
      getRecentCasting(getLanguageKey(locale), idCategory, excludeId).subscribe(
        (res) => {
          const data = getArticlesFromResponse(res?.response);
          if (!data?.length) {
            return;
          }
          setRecentPost(castingList);
        },
        (err) => {
          console.log(err);
        }
      );
    }

    getCastingDetail(getLanguageKey(locale), params.slug).subscribe(
      (res) => {
        const data = getArticlesFromResponse([mockupCasting]);

        setData(data[0]);

        const id = data[0].IdCasting;
        const idCate = data[0].IdRepCastingCategory;
        getRecentCastingFunc(idCate, id);
      },
      (err) => {
        console.log(err);
      }
    );
  }, [index, locale, router.query]);

  if (!data) return;

  return (
    <>
      <div className='custom-container'>
        <h1 className={`header-title ${styles.title}`}>{data.Title}</h1>
        <div className={styles.castingRow}>
          <div className={styles['casting-detail']}>
            <div className={styles['casting-detail__label']}>
              {t('Category')}:
            </div>
            <div className={styles['casting-detail__value']}>
              {get(data, 'Category', '')}
            </div>
          </div>
          <div className={styles['casting-line']}></div>
          <div className={styles['casting-detail']}>
            <div className={styles['casting-detail__label']}>
              {t('Open to')}:
            </div>
            <div className={styles['casting-detail__value']}>
              {get(data, 'OpenTo', '')}
            </div>
          </div>
        </div>
        <div className={styles.castingRow}>
          <div className={styles['casting-detail']}>
            <div className={styles['casting-detail__label']}>
              {t('Location')}:
            </div>
            <div className={styles['casting-detail__value']}>
              {get(data, 'Location', '')}
            </div>
          </div>
          <div className={styles['casting-line']}></div>
          <div className={styles['casting-detail']}>
            <div className={styles['casting-detail__label']}>
              {t('Expires on')}:
            </div>
            <div className={styles['casting-detail__value']}>
              {get(data, 'ExpireDate', '')}
            </div>
          </div>
        </div>
        <div className={styles.castingRow}>
          <div className={styles['casting-detail']}>
            <div className={styles['casting-detail__label']}>
              {t('Pay currency')}:
            </div>
            <div className={styles['casting-detail__value']}>
              {get(data, 'Salary', '')}
            </div>
          </div>
        </div>
        <div className={styles.subTitle}>{data.Teaser}</div>
        <div
          className={styles.imgSubject}
          style={{ backgroundImage: `url(${data.Picture})` }}
        ></div>
        <div className={`row ${styles.content}`}>
          <div className={`col-12 col-lg-9 ${styles.text}`}>
            <div
              dangerouslySetInnerHTML={{
                __html: data.CastingContent,
              }}
            />
            {!!userInfo && (
              <div className={styles['apply-button']} onClick={applyJob}>
                {t('Apply this job')}
              </div>
            )}
          </div>
          <div className={clsx('col-12 col-lg-3')}>
            <div className={styles['recent-job']}>
              <h4 className={styles.recentTitle}>{t('Recent Jobs')}</h4>
              <div className={`row m-0 `}>
                {recentPosts.map((_r, i) => (
                  <Link href={'/casting/' + _r.Link || '#'} key={i} passHref>
                    <a className={styles['casting-item']} target='_blank'>
                      <div className={styles['recent-item']}>
                        <ImageLazyLoad
                          src={_r.Image}
                          alt={_r.Title}
                          width={70}
                          height={70}
                        />
                        <div className={styles['recent-item__info']}>
                          <div className={styles['recent-item__title']}>
                            {_r.Title}
                          </div>
                          <div className={styles['recent-item__date']}>
                            {_r.ExpireDate}
                          </div>
                        </div>
                      </div>
                    </a>
                  </Link>
                ))}
              </div>
              {!!userInfo && (
                <div className={styles['apply-button']} onClick={applyJob}>
                  {t('Apply this job')}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CastingDetail;
