import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import AboutUs from 'pages/aboutus/AboutUs';

const AboutPage = () => <AboutUs />;

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common', 'aboutus'])),
    SEOInfo: { title: 'Aya VN', desc: 'About Us' },
  },
});

export default AboutPage;
