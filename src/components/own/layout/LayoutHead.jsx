/* eslint-disable @next/next/no-page-custom-font */
/* eslint-disable @next/next/no-css-tags */
import Head from 'next/head';

const TITLE = 'AYA VietNam';
const IMAGE = '/images/logo.webp';
const DESC =
  'The Casting and Crowdfunding platform for artists and creators. Connect with your fans and get paid for doing what you love | AyaVn';

const LayoutHead = ({
  SEOInfo = {
    title: 'Aya VN',
    image: '/images/logo.webp',
    desc: 'The Casting and Crowdfunding platform for artists and creators. Connect with your fans and get paid for doing what you love | AyaVn',
  },
}) => (
  <Head>
    <title>{SEOInfo?.title || TITLE}</title>
    <meta
      name='viewport'
      content='minimum-scale=1, initial-scale=1, width=device-width'
    />
    <link rel='icon' href='/favicon.ico' />
    <meta name='title' content={SEOInfo?.title || TITLE} />
    <meta name='description' content={SEOInfo?.desc || DESC} />
    <meta name='image' content={SEOInfo?.image || IMAGE} />

    <meta name='og:title' content={SEOInfo?.title || TITLE} />
    <meta name='og:description' content={SEOInfo?.desc || DESC} />
    <meta name='og:image' content={SEOInfo?.image || IMAGE} />

    <meta itemProp='name' content={SEOInfo?.title || TITLE} />
    <meta itemProp='description' content={SEOInfo?.desc || DESC} />
    <meta itemProp='image' content={SEOInfo?.image || IMAGE} />

    <meta property='og:url' content={SEOInfo.url || ''} />
    <meta property='og:type' content='website' />
    <meta property='og:title' content={SEOInfo?.title || TITLE} />
    <meta property='og:description' content={SEOInfo?.desc || DESC} />
    <meta property='og:image' content={SEOInfo?.image || IMAGE} />
  </Head>
);

export default LayoutHead;
