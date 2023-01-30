import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { NotFound } from 'pages/not-found';

const NotFoundPage = () => <NotFound />;

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'])),
    SEOInfo: { title: 'AyaVn | 404', desc: 'Talent AYA' },
  },
});

export default NotFoundPage;
