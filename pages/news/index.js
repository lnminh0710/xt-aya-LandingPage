import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import News from 'pages/news/News';

const NewsPage = () => <News />;

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common', 'news'])),
    SEOInfo: { title: 'Aya VN', desc: 'news' },
  },
});

export default NewsPage;
