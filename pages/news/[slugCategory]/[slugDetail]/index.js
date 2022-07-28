import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import NewsDetail from 'pages/newsDetail/NewsDetail';

const NewsDetailPage = (props) => <NewsDetail {...props} />;

export async function getServerSideProps({ locale, params, res }) {
  const response = await serverSideTranslations(locale, ['common', 'news']);
  // call api here and pass data to children;
  console.log(res);
  console.log(params);
  try {
    return {
      props: {
        ...response,
        SEOInfo: { title: 'Aya VN - ' },
      },
    };
  } catch (error) {
    return { props: {} };
  }
}

export default NewsDetailPage;
