import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Terms from 'pages/terms/Terms';

const TernsPage = () => <Terms />;

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common', 'terms'])),
  },
});

export default TernsPage;
