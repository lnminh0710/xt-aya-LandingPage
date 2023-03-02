import { EngFlag, VniFlag } from 'assets/svg/flag';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import styled from 'styled-components';
const Root = styled.div`
  display: flex;
  justify-content: flex-end;
`;
const Label = styled.div`
  text-transform: uppercase;
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
  /* identical to box height, or 122% */

  display: flex;
  align-items: center;
  text-align: right;

  color: #000000;

  margin-right: 10px;
  width: 25px;
`;

const LinkLang = styled.a`
  margin-left: ${({ latest }) => (latest ? '-10px' : '')};
  z-index: ${({ selected }) => (selected ? '4' : '')};
  cursor: pointer;
  svg {
    border-radius: 50%;
    width: 30px;
    height: 30px;
  }
`;

const Language = () => {
  const router = useRouter();
  const { locale, pathname, query, asPath } = router;

  return (
    <Root>
      <Label>{locale}</Label>
      <Link href={{ pathname, query }} as={asPath} locale={'vi'}>
        <LinkLang selected={locale === 'vi'}>
          <VniFlag selected={locale === 'vi'} />
        </LinkLang>
      </Link>
      <Link href={{ pathname, query }} as={asPath} locale={'en'}>
        <LinkLang latest selected={locale === 'en'}>
          <EngFlag selected={locale === 'en'} />
        </LinkLang>
      </Link>
    </Root>
  );
};

export default Language;
