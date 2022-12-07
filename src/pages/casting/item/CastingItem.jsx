import { useTranslation } from 'next-i18next';
import Link from 'next/link';

import { ImageLazyLoad } from 'components/own';
import { get } from 'lodash';

import styles from './CastingItem.module.scss';
import { parseDate } from 'utils/convert';

const fields1 = [
  { title: 'Category', field: 'Category' },
  { title: 'Location', field: 'Location' },
  { title: 'Gender', field: 'Gender' },
];

const fields2 = [
  { title: 'Expires on', field: 'ExpiresOn' },
  { title: 'Start on', field: 'StartOn' },
];

const fields3 = [
  { title: 'Language', field: 'Languages' },
  { title: 'Ethnic type', field: 'EthnicType' },
];
const CastingItem = ({ data }) => {
  const { t } = useTranslation(['casting']);
  return (
    <Link
      href={data.IdNewsCasting ? `/casting/${data.IdNewsCasting}` : '#'}
      passHref
    >
      <a className={styles['casting-item']} target='_blank'>
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
            </div>
            <div className={styles['casting-content__row']}>
              <div className={styles['casting-detail']}>
                <div className={styles['casting-detail__label']}>
                  {t('Age')}:
                </div>
                <div className={styles['casting-detail__value']}>
                  {t('from')}:{get(data, 'AgeFrom', 0)}
                  {t('to')}:{get(data, 'AgeTo', 0)}
                </div>
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
