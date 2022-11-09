import { ImageLazyLoad } from 'components/own';
import { get } from 'lodash';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

import styles from './CastingItem.module.scss';

const fields = [
  { title: 'Category', field: 'Category' },
  { title: 'Open to', field: 'OpenTo' },
  { title: 'Location', field: 'Location' },
  { title: 'Expires on', field: 'ExpireDate' },
  { title: 'Pay currency', field: 'Salary' },
];

const CastingItem = ({ data }) => {
  const { t } = useTranslation(['casting']);
  return (
    <Link href={'/casting/' + data.Link || '#'} passHref>
      <a className={styles['casting-item']} target='_blank'>
        <div>
          <ImageLazyLoad
            src={data.Image}
            alt={data.Title}
            width={523}
            height={214}
          />
        </div>
        <div className={styles.info}>
          <div className={styles['casting-title']}>{data.Title}</div>
          {fields.map((_f, i) => (
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
      </a>
    </Link>
  );
};

export default CastingItem;
