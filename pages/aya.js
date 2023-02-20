import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import dynamic from 'next/dynamic';

const Aya = dynamic(() => import('pages/aya/Aya'), {
  loading: () => 'Loading...',
});
const AyaPage = () => <Aya />;

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common', 'aya'])),
  },
});

export default AyaPage;
