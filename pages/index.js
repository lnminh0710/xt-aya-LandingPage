import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Home from 'pages/home/Home';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Homepage = () => <Home />;

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
        SEOInfo: {
          title: 'Aya VN',
          image: '/images/logo.webp',
          desc: 'The Casting and Crowdfunding platform for artists and creators. Connect with your fans and get paid for doing what you love | AyaVn',
        },
      },
    };
  } catch (error) {
    return { props: {} };
  }
}

export default Homepage;
