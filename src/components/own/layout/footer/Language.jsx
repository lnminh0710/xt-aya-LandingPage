import { EngFlag, VniFlag } from 'assets/svg/flag';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import styled from 'styled-components';

const Label = styled.div`
  font-weight: 500;
  font-size: 12px;
  line-height: 16px;

  color: #ffffff;
  margin-right: 1em;
`;

const LinkLang = styled.a`
  margin-left: ${({ latest }) => (latest ? '-10px' : '')};
  z-index: ${({ selected }) => (selected ? '4' : '')};
  cursor: pointer;
  svg {
    border-radius: 50%;
  }
`;

const Language = () => {
  const router = useRouter();
  const { locale, pathname, query, asPath } = router;
  const { t } = useTranslation('common');

  return (
    <div className='d-flex justify-content-end align-items-center'>
      <Label>{t('Change language')}:</Label>
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
    </div>
  );
};

export default Language;
