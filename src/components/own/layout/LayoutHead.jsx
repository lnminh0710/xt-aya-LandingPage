/* eslint-disable @next/next/no-page-custom-font */
/* eslint-disable @next/next/no-css-tags */
import Head from 'next/head';

const TITLE = 'AYA VN';
const IMAGE = 'https://ayavn.com/images/logo.webp';
const DESC = 'AyaVn | Creativity powered by community';

const LayoutHead = ({
  SEOInfo = {
    title: 'Aya VN',
    image: 'https://ayavn.com/images/logo.webp',
    desc: 'AyaVn | Creativity powered by community',
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

    <meta itemProp='name' content={SEOInfo?.title || TITLE} />

    <meta property='og:url' content={SEOInfo?.url || ''} />
    <meta property='og:type' content='website' />
    <meta property='og:title' content={SEOInfo?.title || TITLE} />
    <meta property='og:description' content={SEOInfo?.desc || DESC} />
    <meta property='og:image' content={SEOInfo?.image || IMAGE} />
  </Head>
);

export default LayoutHead;
