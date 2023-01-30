import { API_ENDPOINT } from 'constants/common';
import { getLanguageKey } from 'constants/languages';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import CastingDetail from 'pages/casting-detail/CastingDetail';
import { getArticlesFromResponse } from 'utils/article.uti';

const NewsDetailPage = (props) => <CastingDetail {...props} />;

export async function getServerSideProps({ locale, params, res }) {
  const response = await serverSideTranslations(locale, ['common', 'casting']);
  // call api here and pass data to children;

  const dataResponse = await fetch(
    `${API_ENDPOINT}casting/jobs/details?LoginLanguage=${getLanguageKey(
      locale
    )}&IdNewsCasting=${params.slug}`
  );
  const dataJson = await dataResponse.json();
  const data = getArticlesFromResponse(dataJson)[0];

  try {
    return {
      props: {
        ...response,
        data: data,
        SEOInfo: {
          title: 'AyaVn | ' + data?.Title,
          desc: data?.Teaser,
          image: data?.Picture,
        },
      },
    };
  } catch (error) {
    return { props: {} };
  }
}

export default NewsDetailPage;
