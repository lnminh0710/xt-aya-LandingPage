import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();

export const LOCAL_STORAGE_TOKEN = 'aya_landing-page_token';
export const LOCAL_STORAGE_UID = 'aya_landing-page_uid';
export const LOCAL_STORAGE_IS_LOGGED = 'aya_landing-page_logged';
export const API_ENDPOINT = publicRuntimeConfig.apiEndpoint;
export const ROOT_DOMAIN = publicRuntimeConfig.rootDomain;
export const LOGIN_ENDPOINT = publicRuntimeConfig.loginEndpoint;
export const FILE_ENDPOINT = publicRuntimeConfig.fileEndpoint;
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

export const HttpCode = {
  Unauthorized: 401,
  InternalServerError: 500,
};

export const Configuration = {
  LOCAL_STORAGE_LOGGED: 'logged',
  QUERY_ACCESS_TOKEN: 'at',

  QUERY_DOMAIN_KEY: 'dk',
  QUERY_DOMAIN_ORIGIN: 'o',
  QUERY_ACTION: 'a',
  QUERY_REDIRECT_URL: 'xreply',
  QUERY_UID: 'uid',
};
