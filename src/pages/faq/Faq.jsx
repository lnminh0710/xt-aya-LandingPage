import { QuestionMaskIcon } from 'assets/svg/questionmask';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Accordion } from 'react-bootstrap';
import styles from './style.module.scss';
import { getFaqs } from './service';
import { getLanguageKey } from 'constants/languages';
import { getArticlesFromResponse } from 'utils/article.uti';

const Faq = () => {
  const router = useRouter();
  const { locale, locales, defaultLocale } = router;
  const { t } = useTranslation('faq');
  const [data, setData] = useState([]);
  useEffect(() => {
    getFaqs(getLanguageKey(locale)).subscribe(
      (res) => {
        const data = getArticlesFromResponse(res?.response);
        if (!data?.length) {
          return;
        }
        setData(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }, [locale]);

  return (
    <div className='container'>
      <h1 className='header-title'>{t('title')}</h1>
      <p className={styles.subTitle}>{t('subTitle')}</p>
      <div className={styles.contentWrapper}>
        {data?.length &&
          data.map((item, index) => {
            return (
              <Accordion
                key={`faq-${index}`}
                alwaysOpen
                className='accordion-aya'
              >
                <Accordion.Item eventKey={item.IdNews}>
                  <Accordion.Header>
                    <span className={`icon`}>
                      <QuestionMaskIcon />
                    </span>
                    <span className={`title`}>{item.Title}</span>
                  </Accordion.Header>
                  <Accordion.Body
                    dangerouslySetInnerHTML={{ __html: item.NewsContent }}
                  ></Accordion.Body>
                </Accordion.Item>
              </Accordion>
            );
          })}
      </div>
    </div>
  );
};

export default Faq;
