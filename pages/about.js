import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import AboutUs from 'pages/aboutus/AboutUs';

const AboutPage = () => <AboutUs />;

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common', 'aboutus'])),
  },
});

export default AboutPage;
