import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Price from 'pages/price/Price';

const PlanPage = () => <Price />;

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common', 'price'])),
  },
});

export default PlanPage;
