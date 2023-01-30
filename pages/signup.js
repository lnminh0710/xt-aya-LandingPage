import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import SignUp from 'pages/signup/SignUp';

const SignUpPage = () => <SignUp />;

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common', 'signup', 'fields'])),
  },
});

export default SignUpPage;
