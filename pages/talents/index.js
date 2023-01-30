import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Talents } from 'pages/talents';

const TalentsPage = () => <Talents />;

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common', 'talent'])),
    SEOInfo: { title: 'AyaVn | Talent', desc: 'Talent AYA' },
  },
});

// export async function getServerSideProps({ locale, params, res }) {
//   const response = await serverSideTranslations(locale, ['common']);
//   try {
//     return {
//       props: {
//         ...response,
//         data: {},
//         SEOInfo: { title: 'Aya VN', desc: 'hahaha' },
//       },
//     };
//   } catch (error) {
//     return { props: {} };
//   }
// }

export default TalentsPage;
