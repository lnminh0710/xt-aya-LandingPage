import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import PackagePrice from './PackagePrice';
import styles from './style.module.scss';
import { getConfigs } from './services';
import { LanguageConstant, getLanguageKey } from 'constants/languages';
import { ConfigsConstant } from 'constants/configs';
import { TALENT_URL } from 'constants/common';

const Price = ({ data }) => {
  const router = useRouter();
  const { locale, locales, defaultLocale } = router;
  const { t } = useTranslation('price');

  return (
    <div className='custom-container'>
      <h1 className={`header-title ${styles.customHeader}`}>{t('title')}</h1>
      {/* <p className={styles.subTitle}>
        {t('subTitle_1')}
        <br />
        {t('subTitle_2')}
      </p> */}
      <PackagePrice title={t('packageTitle')} packageList={data} />
    </div>
  );
};

export default Price;
