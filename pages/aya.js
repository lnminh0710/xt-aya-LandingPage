import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Aya from 'pages/aya/Aya';

const AyaPage = () => <Aya />;

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common', 'aya'])),
  },
});

export default AyaPage;
