import { useEffect } from 'react';
import { appWithTranslation } from 'next-i18next';
import { ShellProvider } from 'context/Shell';
import Layout from 'components/own/layout/Layout';
import TagManager from 'react-gtm-module';
import getConfig from 'next/config';

import '../styles/globals.scss';
import { setUpApi } from 'utils/http-intercept';
setUpApi();
const { publicRuntimeConfig } = getConfig();

const tagManagerArgs = {
  gtmId: publicRuntimeConfig.gtmId,
};

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    TagManager.initialize(tagManagerArgs);
  }, []);
  return (
    <ShellProvider>
      <Layout SEOInfo={pageProps?.SEOInfo || {}}>
        <Component {...pageProps} />
      </Layout>
    </ShellProvider>
  );
}

export default appWithTranslation(MyApp);
