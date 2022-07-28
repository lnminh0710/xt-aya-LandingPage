import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Home from 'pages/home/Home';
const Homepage = () => <Home />;
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// export const getStaticProps = async ({ locale }) => ({
//   props: {
//     ...(await serverSideTranslations(locale, ['common', 'home'])),
//     SEOInfo: { title: 'Aya VN', desc: 'hahaha' },
//   },
// });

export async function getServerSideProps({ locale, params, res }) {
  const response = await serverSideTranslations(locale, ['common', 'home']);
  try {
    return {
      props: {
        ...response,
        data: {},
        SEOInfo: { title: 'Aya VN', desc: 'hahaha' },
      },
    };
  } catch (error) {
    return { props: {} };
  }
}

export default Homepage;
