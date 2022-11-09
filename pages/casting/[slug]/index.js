import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import CastingDetail from 'pages/casting-detail/CastingDetail';

const NewsDetailPage = (props) => <CastingDetail {...props} />;

export async function getServerSideProps({ locale, params, res }) {
  const response = await serverSideTranslations(locale, ['common', 'casting']);
  // call api here and pass data to children;
  try {
    return {
      props: {
        ...response,
        SEOInfo: { title: 'Aya VN - Casting detail' },
      },
    };
  } catch (error) {
    return { props: {} };
  }
}

export default NewsDetailPage;
