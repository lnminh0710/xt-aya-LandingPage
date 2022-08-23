import clsx from 'clsx';
import { useMatchQuery } from 'components/hook';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Language from './Language';
import Menu from './Menu';
import axios from 'axios';

import styles from './Header.module.scss';
import MenuMobile from './MenuMobile';
import { APP_ID, Configuration, LOGIN_ENDPOINT } from 'constants/common';
import { useRouter } from 'next/router';
import {
  getLogged,
  getToken,
  getUid,
  removeLogged,
  removeToken,
  removeUid,
  setLogged,
  setToken,
  setUid,
} from 'utils/localstorage';
import ProfileMenu from './ProfileMenu';
import { useCallback } from 'react';
import { useRef } from 'react';

const Root = styled.div`
  height: 100px;
  background: #fafafa;
  display: grid;
  grid-template-columns: ${({ logged }) =>
    logged
      ? '80px 1fr max-content max-content'
      : '80px 1fr max-content max-content max-content'};
  grid-column-gap: 28px;
  align-items: center;
  padding: 0 64px;
  position: sticky;
  top: 0;
  z-index: 10000;
  @media only screen and (max-width: 1296px) {
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
  cursor: pointer;
`;

var interval;
const Header = () => {
  const [open, setOpen] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [urlCheckLogin, setUrlCheckLogin] = useState('');

  const ref = useRef();

  const { t } = useTranslation('common');
  const match = useMatchQuery();

  const router = useRouter();

  const { at, uid } = router.query;

  const initInterval = useCallback(() => {
    if (interval) clearInterval(interval);
    const access_token = getToken();
    const logged = getLogged();

    const uid = getUid();

    const loginUrl = `${LOGIN_ENDPOINT}/nopromt?${
      Configuration.QUERY_ACTION
    }=status&${Configuration.QUERY_DOMAIN_KEY}=${APP_ID}&${
      Configuration.QUERY_DOMAIN_ORIGIN
    }=${window.location.origin}&${
      Configuration.QUERY_UID
    }=${uid}&logged=${!!logged}`;

    setUrlCheckLogin(loginUrl);

    if (!!access_token) {
      interval = setInterval(() => {
        const current_token = getToken();
        if (!current_token) {
          clearInterval(interval);
          alert('Your recently signed out of Aya account. Click ok to update');
          window.location.reload();
        }
      }, 300);
    }
  }, []);

  const getUserProfile = useCallback(() => {
    const token = getToken();
    if (token) {
      axios.get('users/profile').then((res) => {
        setUserInfo(res);
        initInterval();
      });
    } else setUserInfo(null);
  }, [initInterval]);

  const logout = useCallback(() => {
    if (interval) clearInterval(interval);
    ref.current.contentWindow.postMessage(
      {
        type: 'logout',
      },
      LOGIN_ENDPOINT
    );
    removeLogged();
    removeToken();
    removeUid();
    window.location.reload();
  }, []);

  useEffect(() => {
    const checkToken = () => {
      return (e) => {
        if (e.origin !== LOGIN_ENDPOINT) return;
        if (e.data?.type === 'logout') {
          setUrlCheckLogin('');
          if (interval) clearInterval(interval);
          removeUid();
          removeToken();

          alert('Your recently signed out of Aya account. Click ok to update');
          window.location.reload();
        } else if (e.data?.type === 'login') {
          setUid(e.data.data.uaid);
          setToken(e.data.data.access_token);
          localStorage.setItem(Configuration.LOCAL_STORAGE_LOGGED, 'true');
          initInterval();
        } else if (e.data?.type === 'update-token') {
          setToken(e.data.data);
        }
      };
    };
    window.addEventListener('message', checkToken(), false);

    return () => {
      window.removeEventListener('message', checkToken(), false);
    };
  }, [initInterval]);

  useEffect(() => {
    getUserProfile();
  }, [getUserProfile]);

  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'auto';
  }, [open]);

  useEffect(() => {
    if (at) {
      setToken(at);
      setUid(uid);
      setLogged();
      router.replace(router.pathname, undefined, { shallow: true });
      getUserProfile();
    }
  }, [at, getUserProfile, initInterval, router, uid]);

  const routerToLogin = useCallback((path) => {
    window.location.href =
      LOGIN_ENDPOINT + path + '?xreply=' + window.location.origin;
  }, []);

  return (
    <Root logged={!!userInfo} fullWidth={open} id='header-sticky'>
      <div>
        <Link href={'/'}>
          <a>
            <Image
              src={'/images/logo.webp'}
              alt='logo'
              width={84}
              height={84}
              layout='responsive'
              objectFit='cover'
            />
          </a>
        </Link>
      </div>
      {!match && <Menu />}
      {match ? (
        <>
          <div className='d-flex align-items-center justify-content-end'>
            {open && !userInfo && (
              <>
                <Item className='me-2' onClick={() => routerToLogin('')}>
                  {t('Login')}
                </Item>

                <ButtonCreate onClick={() => routerToLogin('/signup')}>
                  {t('Create Account')}
                </ButtonCreate>
              </>
            )}
            {!open && (
              <>
                <Language />
                <div className='mx-2'></div>
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
      ) : !!userInfo ? (
        <>
          <ProfileMenu userInfo={userInfo} logout={logout} />
          <Language />
        </>
      ) : (
        <>
          <Item onClick={() => routerToLogin('')}>{t('Login')}</Item>

          <ButtonCreate onClick={() => routerToLogin('/signup')}>
            {t('Create Account')}
          </ButtonCreate>
          <Language />
        </>
      )}
      {!!urlCheckLogin && (
        <iframe
          ref={ref}
          src={urlCheckLogin}
          frameBorder='0'
          className='d-none'
        ></iframe>
      )}
    </Root>
  );
};

export default Header;
