import { useTranslation } from 'next-i18next';
import Link from 'next/link';

import { ImageLazyLoad } from 'components/own';
import { get } from 'lodash';

import styles from './CastingItem.module.scss';
import { parseDate } from 'utils/convert';
import { useMemo } from 'react';
export const GenderOptions = [
  {
    label: 'Male',
    value: '0',
  },
  {
    label: 'Female',
    value: '1',
  },
  {
    label: 'Other',
    value: '2',
  },
];

const fields1 = [
  { title: 'Category', field: 'Category' },
  { title: 'Location', field: 'Location' },
];

const fields2 = [
  { title: 'Deadline', field: 'ExpiresOn' },
  { title: 'Start on', field: 'JobStartOn' },
];

const fields3 = [
  { title: 'Language', field: 'Language' },
  { title: 'Ethnic type', field: 'EthnicType' },
];
const CastingItem = ({ data }) => {
  const { t } = useTranslation(['casting']);
  const gender = useMemo(() => {
    const value = data?.Gender;
    if (!value) return [];
    value = value.split(',');

    return GenderOptions.filter((_opt) => value.indexOf(_opt.value) > -1);
  }, [data?.Gender]);
  return (
    <Link
      href={data.IdNewsCasting ? `/casting/${data.IdNewsCasting}` : '#'}
      passHref
    >
      <a className={styles['casting-item']}>
        <div>
          <ImageLazyLoad
            src={data.Picture || '/images/post-default.webp'}
            alt={data.Title}
            width={523}
            height={214}
          />
        </div>
        <div className={styles.info}>
          <div className={styles['casting-title']}>{data.Title}</div>
          <div className={styles['casting-content']}>
            <div className={styles['casting-content__row']}>
              {fields1.map((_f, i) => (
                <div className={styles['casting-detail']} key={i}>
                  <div className={styles['casting-detail__label']}>
                    {t(_f.title)}:
                  </div>
                  <div className={styles['casting-detail__value']}>
                    {get(data, _f.field)}
                  </div>
                </div>
              ))}
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
            </div>
            <div className={styles['casting-content__row']}>
              <div className={styles['casting-detail']}>
                <div className={styles['casting-detail__label']}>
                  {t('Age')}:
                </div>
                {!!get(data, 'AgeFrom') || !!get(data, 'AgeTo') ? (
                  <div className={styles['casting-detail__value']}>
                    {`${get(data, 'AgeFrom', 0)} - ${
                      get(data, 'AgeTo', 0) || ''
                    }`}
                  </div>
                ) : (
                  <div className={styles['casting-detail__value']}>N/A</div>
                )}
              </div>
              {fields2.map((_f, i) => (
                <div className={styles['casting-detail']} key={i}>
                  <div className={styles['casting-detail__label']}>
                    {t(_f.title)}:
                  </div>
                  <div className={styles['casting-detail__value']}>
                    {parseDate(get(data, _f.field))}
                  </div>
                </div>
              ))}
            </div>
            <div className={styles['casting-content__row']}>
              {fields3.map((_f, i) => (
                <div className={styles['casting-detail']} key={i}>
                  <div className={styles['casting-detail__label']}>
                    {t(_f.title)}:
                  </div>
                  <div className={styles['casting-detail__value']}>
                    {get(data, _f.field)}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className={styles['casting-preview']}>{data.Teaser}</div>
        </div>
      </a>
    </Link>
  );
};

export default CastingItem;
