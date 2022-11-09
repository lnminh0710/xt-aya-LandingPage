import { useRouter } from 'next/router';

import { Header } from './header';
import LayoutHead from './LayoutHead';

import { ROOT_DOMAIN } from 'constants/common';
import styled from 'styled-components';
import { useMemo } from 'react';
import { Footer } from './footer';

const Root = styled.div``;

const Content = styled.div`
  min-height: calc(100vh - 391px - 100px);
`;

const Layout = ({ children, SEOInfo = {} }) => {
  const location = useRouter();
  const url = useMemo(
    () => ROOT_DOMAIN + location?.asPath?.replace('/', ''),
    [location?.asPath]
  );

  return (
    <Root id='layout-container'>
      <LayoutHead SEOInfo={Object.assign(SEOInfo, { url })} />
      <Header />
      <Content>{children}</Content>
      <Footer />
    </Root>
  );
};

export default Layout;
