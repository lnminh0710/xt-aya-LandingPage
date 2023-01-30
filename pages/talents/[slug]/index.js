import { talentLamVS } from 'mockups/talent';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { TalentProfile } from 'pages/talent-profile';
import { Talents } from 'pages/talents';

const TalentDetailPage = (props) => <TalentProfile {...props} />;

export async function getServerSideProps({ locale, params, res }) {
  const response = await serverSideTranslations(locale, ['common', 'talent']);
  // call api here and pass data to children;
  const data = talentLamVS;
  try {
    return {
      props: {
        ...response,
        data,
        SEOInfo: { title: 'AyaVn | ' + data.name, desc: data.about || '' },
      },
    };
  } catch (error) {
    return { props: {} };
  }
}

export default TalentDetailPage;
