import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Casting from 'pages/casting/Casting';

const CastingPage = () => <Casting />;

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common', 'casting'])),
    SEOInfo: { title: 'AyaVn | Casting' },
  },
});

export default CastingPage;
