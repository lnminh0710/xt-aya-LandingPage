/* eslint-disable @next/next/no-page-custom-font */
/* eslint-disable @next/next/no-css-tags */
import Head from 'next/head';

const TITLE = 'AYA VietNam';

const LayoutHead = ({ SEOInfo }) => (
  <Head>
    <title>{SEOInfo?.title || TITLE}</title>
    <meta
      name='viewport'
      content='minimum-scale=1, initial-scale=1, width=device-width'
    />
    <link rel='icon' href='/favicon.ico' />
    <meta name='title' content={SEOInfo?.title || TITLE} />
    <meta name='description' content={SEOInfo?.desc || ''} />
    <meta name='image' content={SEOInfo?.image || ''} />

    <meta name='og:title' content={SEOInfo?.title || TITLE} />
    <meta name='og:description' content={SEOInfo?.desc || ''} />
    <meta name='og:image' content={SEOInfo?.image || ''} />

    <meta itemProp='name' content={SEOInfo?.title || TITLE} />
    <meta itemProp='description' content={SEOInfo?.desc || ''} />
    <meta itemProp='image' content={SEOInfo?.image || ''} />

    <meta property='og:url' content={SEOInfo.url || ''} />
    <meta property='og:type' content='website' />
    <meta property='og:title' content={SEOInfo?.title || TITLE} />
    <meta property='og:description' content={SEOInfo?.desc || ''} />
    <meta property='og:image' content={SEOInfo?.image || ''} />
  </Head>
);

export default LayoutHead;
