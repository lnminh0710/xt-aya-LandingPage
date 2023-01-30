import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { getCastingDetail } from './services';
import styles from './style.module.scss';
import { getLanguageKey } from 'constants/languages';
import 'react-toastify/dist/ReactToastify.css';
import { get } from 'lodash';
import clsx from 'clsx';
import { useCallback } from 'react';
import { useUserInfo } from 'components/hook/useContextSelector';
import axios from 'axios';
import { API_ENDPOINT } from 'constants/common';
import { ToastContainer, toast } from 'react-toastify';
import { parseDate } from 'utils/convert';
import InputFormikControl from 'components/own/form-control/InputFormikControl';
import { FormikContext, useFormik } from 'formik';
import { getArticlesFromResponse } from 'utils/article.uti';
import { GenderOptions } from 'pages/casting/item/CastingItem';

const CastingDetail = ({ data: d }) => {
  const router = useRouter();
  const userInfo = useUserInfo();
  const { locale, query } = router;

  const { t, i18n } = useTranslation('casting');

  const [data, setData] = useState(d);
  const [showConfirm, setShowConfirm] = useState(false);
  // const [recentPosts, setRecentPost] = useState([]);
  const gender = useMemo(() => {
    let value = data?.Gender;
    if (!value) return [];
    value = value.split(',');

    return GenderOptions.filter((_opt) => value.indexOf(_opt.value) > -1);
  }, [data?.Gender]);

  const getDetail = useCallback(() => {
    if (!query?.slug) {
      return;
    }
    getCastingDetail(getLanguageKey(locale), query.slug).then(
      (res) => {
        setData(getArticlesFromResponse(res)[0]);
      },
      (err) => {
        console.log(err);
      }
    );
  }, [locale, query?.slug]);

  const handleClose = useCallback(() => {
    setShowConfirm(false);
  }, []);

  const formik = useFormik({
    initialValues: { Note: '' },
    onSubmit: (values, { setStatus, setSubmitting }) => {
      axios
        .post(API_ENDPOINT + 'casting/jobs/apply', {
          IdNews: data?.IdNews,
          IdTalent: userInfo?.idTalent,
          Note: values.Note,
          Job: data.Title,
          TalentName:
            userInfo?.displayName ||
            `${userInfo?.firstName} ${userInfo?.lastName}`,
        })
        .then((res) => {
          formik.resetForm();
          toast.success(
            get(
              i18n.getDataByLanguage(locale),
              [
                'casting',
                'Applied successfully. Confirmation has been sent to your email.',
              ],
              'Applied successfully. Confirmation has been sent to your email.'
            )
          );
          setShowConfirm(false);
          getDetail();
        })
        .catch((err) => {
          setShowConfirm(false);
        });
    },
  });

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
              {gender.map((_g, i) =>
                i != 0 ? ', ' + t(_g.label) : t(_g.label)
              )}
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
        <FormikContext.Provider value={formik}>
          <Modal.Header closeButton>
            <Modal.Title>{t('Confirmation')}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className={styles.confirm_title}>
              {t('Do you want to apply for this Job')}?
            </div>
            <Form className='form-wrapper'>
              <InputFormikControl
                formik={formik}
                controlName='Note'
                displayName={t('Personal note')}
              ></InputFormikControl>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button className='btn-aya default' onClick={handleClose}>
              {t('Cancel')}
            </Button>
            <Button className='btn-aya purple ' onClick={formik.submitForm}>
              {t('Submit')}
            </Button>
          </Modal.Footer>
        </FormikContext.Provider>
      </Modal>
      <ToastContainer position='bottom-right' />
    </>
  );
};

export default CastingDetail;
