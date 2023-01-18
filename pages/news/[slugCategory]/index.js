import { API_ENDPOINT } from 'constants/common';
import { getLanguageKey } from 'constants/languages';
import { get, upperFirst } from 'lodash';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import NewsCategory from 'pages/newscategory/Newscategory';
import { getCategoryBySlug } from 'pages/newscategory/service';

const NewsCategoryPage = (props) => <NewsCategory {...props} />;

export async function getServerSideProps({ locale, params, res }) {
  const response = await serverSideTranslations(locale, ['common', 'news']);
  const resData = await await fetch(
    `${API_ENDPOINT}category?LoginLanguage=${getLanguageKey(locale)}&SlugURL=${
      params.slugCategory
    }`
  );
  const dataJson = await resData.json();

  try {
    return {
      props: {
        ...response,
        SEOInfo: {
          title:
            'AyaVN - ' + upperFirst(get(dataJson, [0, 'CategoryName'], '')),
        },
      },
    };
  } catch (error) {
    return { props: {} };
  }
}

export default NewsCategoryPage;
