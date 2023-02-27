import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import PhotosCredit from 'pages/photos-credit/PhotosCredit';

const PhotosCreditPage = () => <PhotosCredit />;

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'])),
  },
});

export default PhotosCreditPage;
