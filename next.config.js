/** @type {import('next').NextConfig} */
const path = require('path');
const { i18n } = require('./next-i18next.config');

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig = {
  reactStrictMode: false,
  optimizeFonts: false,
  experimental: {
    outputStandalone: true,
  },
  images: {
    domains: ['m.media-amazon.com', 'bilutv.link', 'ayafile.xoontec.vn'],
    formats: ['image/webp'],
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  compiler: {
    // Enables the styled-components SWC transform
    styledComponents: true,
  },
  publicRuntimeConfig: {
    // Will be available on both server and client
    rootDomain: process.env.NEXT_DOMAIN_URL,
    apiEndpoint: process.env.NEXT_API_ENDPOINT,
    authEndpoint: process.env.NEXT_AUTH_ENDPOINT,
    loginEndpoint: process.env.NEXT_LOGIN_URL,
    fileEndpoint: process.env.NEXT_FILE_ENDPOINT,
    talentUrl: process.env.NEXT_TALENT_URL,
    appId: process.env.NEXT_APP_ID,
  },
  i18n,
};

module.exports = withBundleAnalyzer(nextConfig);
