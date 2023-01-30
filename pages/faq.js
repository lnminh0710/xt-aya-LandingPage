import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Faq from 'pages/faq/Faq';

const FaqPage = () => <Faq />;

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common', 'faq'])),
  },
});

export default FaqPage;
