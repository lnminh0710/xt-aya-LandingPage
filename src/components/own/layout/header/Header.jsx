import clsx from 'clsx';
import { useMatchQuery } from 'components/hook';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Language from './Language';
import Menu from './Menu';

import styles from './Header.module.scss';
import MenuMobile from './MenuMobile';
import { LOGIN_ENDPOINT, ROOT_DOMAIN } from 'constants/common';
import ImageLazyLoad from 'components/own/ImageLazyLoad';

const Root = styled.div`
  height: 100px;
  background: #fafafa;
  display: grid;
  grid-template-columns: 80px 1fr max-content max-content max-content;
  grid-column-gap: 28px;
  align-items: center;
  padding: 0 64px;
  position: sticky;
  top: 0;
  z-index: 10000;
  @media only screen and (max-width: 1296px) {
    grid-template-columns: 84px 1fr max-content max-content max-content;
    padding: 0 14px;
    max-width: 100vw;
  }
  @media only screen and (max-width: 900px) {
    grid-gap: 12px;
  }
  @media only screen and (max-width: 768px) {
    grid-template-columns: 52px 1fr;
    height: 63px;
    width: ${({ fullWidth }) => (fullWidth ? '100vw' : '100%')};
  }
`;
const ButtonCreate = styled.div`
  width: 170px;
  height: 48px;

  /* Primary/02 */

  background: #674f82;
  border-radius: 45px;

  font-weight: 600;
  font-size: 16px;
  line-height: 26px;

  display: flex;
  align-items: center;
  justify-content: center;

  /* White / 01 */
  cursor: pointer;
  color: #ffffff;

  @media only screen and (max-width: 1296px) {
    width: 140px;
    height: 40px;
    font-size: 14px;
    line-height: 24px;
  }
`;

const Item = styled.div`
  font-weight: 600;
  font-size: 16px;
  line-height: 26px;
  /* identical to box height, or 162% */

  /* Grey/01 */

  color: #2c2b34;
`;

const Header = () => {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation('common');
  const match = useMatchQuery();

  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'auto';
  }, [open]);

  return (
    <Root fullWidth={open} id='header-sticky'>
      <div>
        <Link href={'/'}>
          <a>
            <ImageLazyLoad
              src={'/images/logo.webp'}
              alt='logo'
              width={84}
              height={84}
            />
          </a>
        </Link>
      </div>
      {!match && <Menu />}
      {match ? (
        <>
          <div className='d-flex align-items-center justify-content-end'>
            {open && (
              <>
                <a href={LOGIN_ENDPOINT} rel='noreferrer' className='me-3'>
                  <Item>{t('Login')}</Item>
                </a>
                <a href={LOGIN_ENDPOINT + '/signup'} rel='noreferrer'>
                  <ButtonCreate className='me-2'>
                    {t('Create Account')}
                  </ButtonCreate>
                </a>
              </>
            )}

            <div
              className={clsx(styles['nav-button'], { [styles.active]: open })}
              onClick={() => setOpen(!open)}
            >
              <div className={styles['nav-button__top']}></div>
              <div className={styles['nav-button__middle']}></div>
              <div className={styles['nav-button__bottom']}></div>
            </div>
          </div>
          <MenuMobile open={open} setOpen={setOpen} />
        </>
      ) : (
        <>
          <a href={LOGIN_ENDPOINT + '?xreply=' + ROOT_DOMAIN} rel='noreferrer'>
            <Item>{t('Login')}</Item>
          </a>
          <a
            href={LOGIN_ENDPOINT + '/signup?xreply=' + ROOT_DOMAIN}
            rel='noreferrer'
          >
            <ButtonCreate>{t('Create Account')}</ButtonCreate>
          </a>
          <Language />
        </>
      )}
    </Root>
  );
};

export default Header;
