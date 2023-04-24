import clsx from 'clsx';
import { useMatchQuery } from 'components/hook';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Language from './Language';
import Menu from './Menu';
import axios from 'axios';

import styles from './Header.module.scss';
import MenuMobile from './MenuMobile';
import {
  APP_ID,
  Configuration,
  LOGIN_ENDPOINT,
  Routes,
} from 'constants/common';
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
import { iOS } from 'utils/common';
import {
  useActionGetUserInfo,
  useUserInfo,
} from 'components/hook/useContextSelector';
import ImageLazyLoad from 'components/own/ImageLazyLoad';
import { Button, Modal } from 'react-bootstrap';

const Root = styled.div`
  height: 80px;
  background: #fafafa;
  display: grid;
  grid-template-columns: ${({ logged }) =>
    logged
      ? '64px 1fr 180px max-content'
      : '64px 1fr max-content max-content max-content'};
  grid-column-gap: 26px;
  align-items: center;
  padding: 0 51px;
  position: sticky;
  top: 0;
  z-index: 10000;
  @media only screen and (max-width: 1037px) {
    padding: 0 12px;
    max-width: 100vw;
  }
  @media only screen and (max-width: 900px) {
    grid-gap: 10px;
  }
  @media only screen and (max-width: 768px) {
    grid-template-columns: 41px 1fr;
    height: 50px;
    width: ${({ fullWidth }) => (fullWidth ? '100vw' : '100%')};
  }
`;
const ButtonCreate = styled.div`
  width: 136px;
  height: 38px;

  /* Primary/02 */

  background: #674f82;
  border-radius: 45px;

  font-weight: 600;
  font-size: 14px;
  line-height: 24px;

  display: flex;
  align-items: center;
  justify-content: center;

  /* White / 01 */
  cursor: pointer;
  color: #ffffff;

  @media only screen and (max-width: 1037px) {
    width: 112px;
    height: 32px;
    font-size: 12px;
    line-height: 22px;
  }
`;

const Item = styled.div`
  font-weight: 600;
  font-size: 14px;
  line-height: 24px;
  /* identical to box height, or 162% */

  /* Grey/01 */

  color: #2c2b34;
  cursor: pointer;
`;

var interval;
const Header = () => {
  const [open, setOpen] = useState(false);
  const [urlCheckLogin, setUrlCheckLogin] = useState('');
  const [showConfirm, setShowConfirm] = useState(false);
  const userInfo = useUserInfo();
  const getUserProfile = useActionGetUserInfo();
  const ref = useRef();

  const { t } = useTranslation('common');
  const match = useMatchQuery();

  const router = useRouter();

  const { at, uid, lang } = router.query;

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
    if (!iOS()) setUrlCheckLogin(loginUrl);

    if (!!access_token) {
      interval = setInterval(() => {
        const current_token = getToken();
        if (!current_token) {
          clearInterval(interval);
          window.location.reload();
        }
      }, 300);
    }
  }, []);

  const logout = useCallback(() => {
    if (interval) clearInterval(interval);
    if (iOS()) {
      removeLogged();
      removeUid();
      removeToken();
      setTimeout(() => {
        window.location.href =
          LOGIN_ENDPOINT + '/logout?xreply=' + window.location.href;
      }, 100);
      return;
    }
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

  const onClickLogout = useCallback(() => {
    setShowConfirm(true);
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
          removeLogged();
          window.location.reload();
        } else if (e.data?.type === 'login') {
          setUid(e.data.data.uaid || '');
          setToken(e.data.data.access_token);
          localStorage.setItem(Configuration.LOCAL_STORAGE_LOGGED, 'true');
          initInterval();
          getUserProfile(initInterval);
        } else if (e.data?.type === 'update-token') {
          setToken(e.data.data);
          getUserProfile(initInterval);
        }
      };
    };
    window.addEventListener('message', checkToken(), false);

    return () => {
      window.removeEventListener('message', checkToken(), false);
    };
  }, [getUserProfile, initInterval]);

  useEffect(() => {
    getUserProfile(initInterval);
  }, [getUserProfile, initInterval]);

  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'auto';
  }, [open]);

  useEffect(() => {
    if (at) {
      setToken(at);
      setUid(uid);
      setLogged();
      router.replace(router.pathname, undefined, {
        locale: lang || router.locale,
      });
      getUserProfile(initInterval);
    } else if (lang) {
      router.replace(router.pathname, undefined, {
        locale: lang || router.locale,
      });
    }
  }, [at, getUserProfile, initInterval, lang, router, uid]);

  const routerToLogin = useCallback(
    (path) => {
      window.location.href =
        LOGIN_ENDPOINT +
        path +
        '?xreply=' +
        window.location.origin +
        '&lang=' +
        router.locale;
    },
    [router.locale]
  );

  const handleClose = useCallback(() => {
    setShowConfirm(false);
  }, []);

  return (
    <>
      <Root logged={!!userInfo} fullWidth={open} id='header-sticky'>
        <div>
          <Link href={Routes.HOME}>
            <a>
              <ImageLazyLoad
                src={'/images/logo.webp'}
                alt='logo'
                width={64}
                height={69}
              />
            </a>
          </Link>
        </div>
        {!match && <Menu />}
        {match ? (
          <>
            <div className='d-flex align-items-center justify-content-end'>
              <Language />
              <div className='mx-2'></div>
              {/* {open && !userInfo && (
              <>
                <Item className='me-2' onClick={() => routerToLogin('')}>
                  {t('Login')}
                </Item>

                <ButtonCreate onClick={() => routerToLogin('/signup')}>
                  {t('Create Account')}
                </ButtonCreate>
              </>
            )} */}
              {/* {!open && (
              <>
                <Language />
                <div className='mx-2'></div>
              </>
            )} */}
              <div
                className={clsx(styles['nav-button'], {
                  [styles.active]: open,
                })}
                onClick={() => setOpen(!open)}
              >
                <div className={styles['nav-button__top']}></div>
                <div className={styles['nav-button__middle']}></div>
                <div className={styles['nav-button__bottom']}></div>
              </div>
            </div>
            <MenuMobile
              open={open}
              setOpen={setOpen}
              routerToLogin={routerToLogin}
              userInfo={userInfo}
              logout={onClickLogout}
            />
          </>
        ) : !!userInfo ? (
          <>
            <ProfileMenu userInfo={userInfo} logout={onClickLogout} />
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
      <Modal show={showConfirm} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>{t('Confirmation')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className={styles.confirm_title}>
            {t('Are you sure you want to logout?')}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button className='btn-aya default' onClick={handleClose}>
            {t('No')}
          </Button>
          <Button className='btn-aya purple ' onClick={logout}>
            {t('Yes')}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Header;
