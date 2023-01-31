import { useState } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import {
  FooterFacebookIcon,
  FooterLocationIcon,
  FooterMailIcon,
  FooterPhoneIcon,
} from 'assets/svg';
import { useTranslation } from 'next-i18next';
import Language from './Language';
import { Routes } from 'constants/common';
import { useMatchQuery } from 'components/hook';
import ImageLazyLoad from 'components/own/ImageLazyLoad';
import { getConfigs } from './services';
import { ConfigsConstant } from 'constants/configs';
import { useEffect } from 'react';
import { LanguageConstant, getLanguageKey } from 'constants/languages';
import { useRouter } from 'next/router';

const Root = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  background: #1b0e2c;
`;

const Content = styled.div`
  width: 100%;
  flex: 1;

  display: grid;
  grid-template-columns: 80px 1fr max-content;
  grid-column-gap: 134px;
  padding: 62px 216px;

  @media only screen and (max-width: 1296px) {
    padding: 56px 14px;
  }

  @media only screen and (max-width: 768px) {
    grid-template-columns: 1fr;
    grid-template-rows: 80px max-content max-content;
    grid-row-gap: 48px;
    padding: 56px 32px;
  }
`;

const Line = styled.div`
  border-bottom: 1px solid #3e2a57;
`;

const Actions = styled.div`
  width: 100%;
  height: 96px;
  padding: 0 216px;

  display: grid;
  grid-template-columns: 160px 1fr 180px;
  grid-gap: 32px;
  align-items: center;
  @media only screen and (max-width: 1296px) {
    padding: 0 14px;
  }

  @media only screen and (max-width: 768px) {
    padding: 32px;
    height: auto;
    display: flex;
    flex-direction: column;
    grid-gap-rows: 27px;
    div:nth-of-type(2) {
      min-width: 160px;
    }
  }
`;

const Title = styled.div`
  font-weight: 600;
  font-size: 24px;
  line-height: 30px;
  /* identical to box height, or 125% */

  /* White / 01 */

  color: #ffffff;
  margin-bottom: 26px;
`;
const Label = styled.div`
  font-size: 16px;
  line-height: 26px;
  /* identical to box height, or 162% */

  /* Primary/05 */

  color: #e1d6ec;
`;
const Row = styled.div`
  display: grid;
  grid-template-columns: 32px 1fr;
  grid-gap: 18px;
  margin-bottom: 10px;
  align-items: center;
`;

const Categories = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 14px;
`;

const CategoryItem = styled.a`
  font-size: 16px;
  line-height: 26px;
  /* identical to box height, or 162% */

  /* Primary/05 */

  color: #e1d6ec;
  cursor: pointer;
`;

const ActionSubTitle = styled.div`
  font-weight: 500;
  font-size: 12px;
  line-height: 16px;
  /* identical to box height, or 133% */

  text-align: center;

  /* Primary/05 */

  color: ${({ color }) => color || '#E1D6EC'};
`;

const initialInfo = {
  name: 'AYAVN Company Limited',
  address: '68 Nguyễn Huệ, Phường Bến Nghé, Quận 1, Thành phố Hồ Chí Minh, VN',
  phone: '+84 97 2347 517',
  email: 'info@ayavn.com',
};

const categories = [
  {
    name: 'Home',
    link: Routes.HOME,
  },
  {
    name: 'Privacy Policy',
    link: Routes.PRIVACY,
  },
  {
    name: 'About Us',
    link: Routes.ABOUT,
  },
  {
    name: 'Terms of use',
    link: Routes.TERM,
  },
  {
    name: 'Contact',
    link: Routes.CONTACT,
  },
  {
    name: 'FAQ',
    link: Routes.FAQ,
  },
];

const Footer = () => {
  const router = useRouter();
  const { locale, locales, defaultLocale } = router;

  const [info, setInfo] = useState(initialInfo);
  const { t } = useTranslation('common');
  const match = useMatchQuery();

  useEffect(() => {
    getConfigs().subscribe((res) => {
      if (!res?.response?.length) return;

      const currentLang = getLanguageKey(locale);

      const name = res?.response.find(
        (x) => x.ParamKey === ConfigsConstant.COMPANY_NAME
      );
      const address = res?.response.find(
        (x) => x.ParamKey === ConfigsConstant.COMPANY_ADDRESS
      );
      const phone = res?.response.find(
        (x) => x.ParamKey === ConfigsConstant.COMPANY_PHONE
      );
      const email = res?.response.find(
        (x) => x.ParamKey === ConfigsConstant.COMPANY_EMAIL
      );
      const fb = res?.response.find(
        (x) => x.ParamKey === ConfigsConstant.COMPANY_FACEBOOK
      );
      const twt = res?.response.find(
        (x) => x.ParamKey === ConfigsConstant.COMPANY_TWITTER
      );
      const gg = res?.response.find(
        (x) => x.ParamKey === ConfigsConstant.COMPANY_GG_PLUS
      );

      const nameTrans =
        currentLang === LanguageConstant.VI
          ? name?.ParamValueVN
          : name?.ParamValueEN;
      const addressTrans =
        currentLang === LanguageConstant.VI
          ? address?.ParamValueVN
          : address?.ParamValueEN;
      const phoneTrans =
        currentLang === LanguageConstant.VI
          ? phone?.ParamValueVN
          : phone?.ParamValueEN;
      const emailTrans =
        currentLang === LanguageConstant.VI
          ? email?.ParamValueVN
          : email?.ParamValueEN;
      const fbTrans =
        currentLang === LanguageConstant.VI
          ? fb?.ParamValueVN
          : fb?.ParamValueEN;
      const twtTrans =
        currentLang === LanguageConstant.VI
          ? twt?.ParamValueVN
          : twt?.ParamValueEN;
      const ggTrans =
        currentLang === LanguageConstant.VI
          ? gg?.ParamValueVN
          : gg?.ParamValueEN;

      const infoTemp = {
        name: nameTrans,
        address: addressTrans,
        phone: phoneTrans,
        email: emailTrans,
        fb: fbTrans || 'https://facebook.com/',
        twt: twtTrans || 'https://twitter.com/',
        gg: ggTrans || 'https://www.google.com/',
      };
      setInfo(infoTemp);
    });
  }, [locale]);

  return (
    <Root>
      <Content className='container-root'>
        <Link href={Routes.HOME} passHref>
          <a className='mx-auto' style={{ width: 80 }}>
            <ImageLazyLoad
              src={'/images/logo.webp'}
              alt='logo'
              width={84}
              height={84}
            />
          </a>
        </Link>
        <div className='d-flex flex-column'>
          <Title>{info.name}</Title>
          <Row>
            <FooterLocationIcon />
            <Label>{info.address}</Label>
          </Row>
          <Row>
            <FooterPhoneIcon />
            <Label>{info.phone}</Label>
          </Row>
          <Row>
            <FooterMailIcon />
            <Label>{info.email}</Label>
          </Row>
        </div>
        <div className='d-flex flex-column'>
          <Title>{t('Categories')}</Title>
          <Categories>
            {categories.map((_cat, index) => (
              <Link key={index} href={_cat.link} passHref>
                <CategoryItem>{t(_cat.name)}</CategoryItem>
              </Link>
            ))}
          </Categories>
        </div>
      </Content>
      <Line />
      <Actions className='container-root'>
        {match && <Language />}
        <div className='d-flex align-items-center justify-content-between'>
          <a href={info.fb} target='_blank' rel='noreferrer'>
            <FooterFacebookIcon />
          </a>
          {/* <a href={info.twt} target='_blank' rel='noreferrer'>
            <FooterTwisterIcon />
          </a>
          <a href={info.gg} target='_blank' rel='noreferrer'>
            <FooterGooglePlusIcon />
          </a> */}
        </div>
        <ActionSubTitle>AyaVn.com - All Rights Reserved</ActionSubTitle>
        {!match && <Language />}
      </Actions>
    </Root>
  );
};

export default Footer;
