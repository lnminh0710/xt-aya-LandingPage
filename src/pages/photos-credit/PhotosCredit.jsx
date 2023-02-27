import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { useTranslation } from 'next-i18next';

import styles from './PhotosCredit.module.scss';

import { getLanguageKey, LanguageConstant } from 'constants/languages';
import { ConfigsConstant } from 'constants/configs';
import { getConfigs } from 'pages/price/services';

const PhotosCredit = () => {
  const { t } = useTranslation();
  const [info, setInfo] = useState(null);
  const { locale } = useRouter();

  useEffect(() => {
    getConfigs().subscribe((res) => {
      if (!res?.response?.length) return;

      const currentLang = getLanguageKey(locale);

      const name = res?.response.find(
        (x) => x.ParamKey === ConfigsConstant.PHOTO_CREDIT
      );

      const nameTrans =
        currentLang === LanguageConstant.VI
          ? name?.ParamValueVN
          : name?.ParamValueEN;

      setInfo(nameTrans);
    });
  }, [locale]);
  return (
    <div className={styles.root}>
      <div className={styles.title}>{t('Photos Credit')}</div>
      <div
        className={styles.content}
        dangerouslySetInnerHTML={{ __html: info }}
      ></div>
    </div>
  );
};

export default PhotosCredit;
