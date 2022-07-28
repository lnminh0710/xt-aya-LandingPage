import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();

export const API_ENDPOINT = publicRuntimeConfig.apiEndpoint;
export const ROOT_DOMAIN = publicRuntimeConfig.rootDomain;
export const LOGIN_ENDPOINT = publicRuntimeConfig.loginEndpoint;
export const APP_ID = publicRuntimeConfig.appId;

export const Routes = {
  HOME: '/',
  ABOUT: '/about',
  TALENTS: '/talents',
  AYA: '/aya',
  NEWS: '/news',
  CASTING: '/casting',
  PRICE: '/plan',
  FAQ: '/faq',
  TERM: '/terms',
  PRIVACY: '/privacy',
  CONTACT: '/contact',
};
