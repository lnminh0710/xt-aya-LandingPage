/* eslint-disable @next/next/no-page-custom-font */
/* eslint-disable @next/next/no-css-tags */
import { useTranslation } from 'next-i18next';
import Head from 'next/head';

const TITLE = 'AyaVn | Sáng tạo được cung cấp bởi cộng đồng';
const IMAGE = 'https://ayavn.com/images/meta-image.webp';
const DESC =
  'Nền tảng Casting và Crowdfunding dành cho các nghệ sĩ và người sáng tạo. Kết nối với người hâm mộ của bạn và được trả tiền khi làm những gì bạn yêu thích | AyaVn';

const LayoutHead = ({
  SEOInfo = {
    title: 'AyaVn | Sáng tạo được cung cấp bởi cộng đồng',
    image: 'https://ayavn.com/images/meta-image.webp',
    desc: 'Nền tảng Casting và Crowdfunding dành cho các nghệ sĩ và người sáng tạo. Kết nối với người hâm mộ của bạn và được trả tiền khi làm những gì bạn yêu thích | AyaVn',
  },
}) => {
  const { t } = useTranslation('common');
  return (
    <Head>
      <title>{t(SEOInfo?.title || TITLE)}</title>
      <meta
        name='viewport'
        content='minimum-scale=1, initial-scale=1, width=device-width'
      />
      <link rel='icon' href='/favicon.ico' />
      <meta name='title' content={t(SEOInfo?.title || TITLE)} />
      <meta name='description' content={t(SEOInfo?.desc || DESC)} />
      <meta name='image' content={SEOInfo?.image || IMAGE} />

      <meta itemProp='name' content={t(SEOInfo?.title || TITLE)} />

      <meta property='og:url' content={SEOInfo?.url || ''} />
      <meta property='og:type' content='website' />
      <meta property='og:title' content={t(SEOInfo?.title || TITLE)} />
      <meta property='og:description' content={t(SEOInfo?.desc || DESC)} />
      <meta property='og:image' content={SEOInfo?.image || IMAGE} />
    </Head>
  );
};

export default LayoutHead;
