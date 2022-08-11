import { appWithTranslation } from 'next-i18next';
import { ShellProvider } from 'context/Shell';
import Layout from 'components/own/layout/Layout';

import '../styles/globals.scss';
import { setUpApi } from 'utils/http-intercept';
setUpApi();

function MyApp({ Component, pageProps }) {
  return (
    <ShellProvider>
      <Layout SEOInfo={pageProps?.SEOInfo || {}}>
        <Component {...pageProps} />
      </Layout>
    </ShellProvider>
  );
}

export default appWithTranslation(MyApp);
