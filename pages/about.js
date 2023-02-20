import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import dynamic from 'next/dynamic';

const AboutUs = dynamic(() => import('pages/aboutus/AboutUs'), {
  loading: () => 'Loading...',
});
const AboutPage = () => <AboutUs />;

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common', 'aboutus'])),
  },
});

export default AboutPage;
