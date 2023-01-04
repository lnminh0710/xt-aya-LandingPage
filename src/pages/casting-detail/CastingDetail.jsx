import { CalendarIcon, PencilIcon } from 'assets/svg';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Button, FormControl, InputGroup, Modal } from 'react-bootstrap';
import {
  getCastingDetail,
  getRecentCasting,
  getOtherCasting,
} from './services';
import styles from './style.module.scss';
import { getLanguageKey } from 'constants/languages';
import { getArticlesFromResponse } from 'utils/article.uti';
import { castingList, mockupCasting } from './mockup';
import 'react-toastify/dist/ReactToastify.css';
import { get } from 'lodash';
import Link from 'next/link';
import { ImageLazyLoad } from 'components/own';
import clsx from 'clsx';
import { useCallback } from 'react';
import { useUserInfo } from 'components/hook/useContextSelector';
import axios from 'axios';
import { API_ENDPOINT } from 'constants/common';
import { ToastContainer, toast } from 'react-toastify';
import { parseDate } from 'utils/convert';

const CastingDetail = () => {
  const router = useRouter();
  const userInfo = useUserInfo();
  const { locale, query } = router;

  const { t } = useTranslation('casting');
  const [data, setData] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  // const [recentPosts, setRecentPost] = useState([]);

  const getDetail = useCallback(() => {
    if (!query?.slug) {
      return;
    }
    getCastingDetail(getLanguageKey(locale), query.slug).then(
      (res) => {
        setData(res[0]);
      },
      (err) => {
        console.log(err);
      }
    );
  }, [locale, query?.slug]);

  const applyJob = useCallback(() => {
    axios
      .post(API_ENDPOINT + 'casting/jobs/apply', {
        IdNews: data?.IdNews,
        IdTalent: userInfo?.idTalent,
      })
      .then((res) => {
        toast.success('Apply successfully');
        setShowConfirm(false);
        getDetail();
      })
      .catch((err) => {
        setShowConfirm(false);
      });
  }, [data?.IdNews, getDetail, userInfo?.idTalent]);

  const handleClose = useCallback(() => {
    setShowConfirm(false);
  }, []);

  useEffect(() => {
    getDetail();
  }, [getDetail]);

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
              {t('Location')}:
            </div>
            <div className={styles['casting-detail__value']}>
              {get(data, 'Location', '')}
            </div>
          </div>
          <div
            className={clsx(styles['casting-line'], styles['hide-in-mobile'])}
          ></div>
          <div className={styles['casting-detail']}>
            <div className={styles['casting-detail__label']}>
              {t('Gender')}:
            </div>
            <div className={styles['casting-detail__value']}>
              {get(data, 'Gender', '')}
            </div>
          </div>
          <div
            className={clsx(styles['casting-line'], styles['show-in-mobile'])}
          ></div>
          <div className={styles['casting-detail']}>
            <div className={styles['casting-detail__label']}>{t('Age')}:</div>
            <div className={styles['casting-detail__value']}>
              {`${t('from')} : ${get(data, 'AgeFrom', 0)} ${t('to')} ${get(
                data,
                'AgeTo',
                0
              )}`}
            </div>
          </div>
          <div
            className={clsx(styles['casting-line'], styles['hide-in-mobile'])}
          ></div>

          <div className={styles['casting-detail']}>
            <div className={styles['casting-detail__label']}>
              {t('Start on')}:
            </div>
            <div className={styles['casting-detail__value']}>
              {parseDate(get(data, 'StartOn', ''))}
            </div>
          </div>
          <div className={styles['casting-line']}></div>
          <div className={styles['casting-detail']}>
            <div className={styles['casting-detail__label']}>
              {t('Deadline')}:
            </div>
            <div className={styles['casting-detail__value']}>
              {parseDate(get(data, 'ExpiresOn', ''))}
            </div>
          </div>
          <div className={styles['casting-detail']}>
            <div className={styles['casting-detail__label']}>
              {t('Languages')}:
            </div>
            <div className={styles['casting-detail__value']}>
              {get(data, 'Language', '')}
            </div>
          </div>
          <div className={styles['casting-line']}></div>
          <div className={styles['casting-detail']}>
            <div className={styles['casting-detail__label']}>
              {t('Ethnic type')}:
            </div>
            <div className={styles['casting-detail__value']}>
              {get(data, 'EthnicType', '')}
            </div>
          </div>
        </div>
        <div className={styles.subTitle}>{data.Teaser}</div>
        <div
          className={styles.imgSubject}
          style={{
            backgroundImage: `url(${
              data.Picture || '/images/post-default.webp'
            })`,
          }}
        ></div>
        <div className={`row ${styles.content}`}>
          <div className={`col-12 col-lg-12 ${styles.text}`}>
            <div
              dangerouslySetInnerHTML={{
                __html: data.NewsContent,
              }}
            />
            {!!userInfo && !!userInfo?.idTalent && (
              <div
                className={clsx(styles['apply-button'], {
                  [styles['applied']]: data.IsApplied,
                })}
                onClick={() => setShowConfirm(true)}
              >
                {!data.IsApplied ? t('Apply this job') : t('Applied')}
              </div>
            )}
          </div>
          {/* <div className={clsx('col-12 col-lg-3')}>
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
          </div> */}
        </div>
      </div>
      <Modal show={showConfirm} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>Do you want to apply this Job?</Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            No
          </Button>
          <Button variant='primary' onClick={applyJob}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer position='bottom-right' />
    </>
  );
};

export default CastingDetail;
