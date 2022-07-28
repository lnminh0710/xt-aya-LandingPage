import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Contact from 'pages/contact/Contact';

const ContactPage = () => <Contact />;

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common', 'contact', 'fields'])),
    SEOInfo: { title: 'Aya VN', desc: 'terms' },
  },
});

export default ContactPage;
