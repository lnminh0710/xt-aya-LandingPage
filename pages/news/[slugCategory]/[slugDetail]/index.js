import { API_ENDPOINT } from 'constants/common';
import { getLanguageKey } from 'constants/languages';
import { get } from 'lodash';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import NewsDetail from 'pages/newsDetail/NewsDetail';
import { getNewsDetail } from 'pages/newsDetail/services';
import { getArticlesFromResponse } from 'utils/article.uti';

const NewsDetailPage = (props) => <NewsDetail {...props} />;

export async function getServerSideProps({ locale, params, res }) {
  const response = await serverSideTranslations(locale, ['common', 'news']);

  const dataResponse = await fetch(
    `${API_ENDPOINT}news?LoginLanguage=${getLanguageKey(locale)}&SlugURL=${
      params.slugDetail
    }`
  );
  const dataJson = await dataResponse.json();
  const data = getArticlesFromResponse(dataJson);

  try {
    return {
      props: {
        ...response,
        data: data[0],
        SEOInfo: {
          title: 'AyaVN - ' + get(data, [0, 'Title'], ''),
          desc: get(data, [0, 'Teaser'], ''),
          image: get(data, [0, 'Picture'], ''),
        },
      },
    };
  } catch (error) {
    return { props: {} };
  }
}

export default NewsDetailPage;
