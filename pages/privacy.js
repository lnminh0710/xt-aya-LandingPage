import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Privacy from 'pages/privacy/Privacy';

const PrivacyPage = () => <Privacy />;

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common', 'privacy'])),
  },
});

export default PrivacyPage;
