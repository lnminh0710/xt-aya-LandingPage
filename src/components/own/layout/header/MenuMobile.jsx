import { FILE_ENDPOINT, TALENT_URL } from 'constants/common';
import { menuMockup } from 'mockups/menu';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import { Modal } from 'react-bootstrap';
import styled from 'styled-components';

const Item = styled.a`
  font-weight: 600;
  font-size: 14px;
  line-height: 24px;
  /* identical to box height, or 162% */

  /* Grey/01 */

  color: #fff;
  cursor: pointer;
`;

const MenuItem = styled.div`
  width: 100%;
  height: 64px;
  display: flex;
  align-items: center;
  padding: 0 14px;
`;

const ButtonCreate = styled.div`
  width: 170px;
  height: 48px;

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
    width: 140px;
    height: 40px;
    font-size: 12px;
    line-height: 22px;
  }
`;

const Profile = styled.div`
  border-top: 1px solid #858585;
  width: 100%;
  padding: 14px;

  display: grid;
  align-items: center;
  grid-template-columns: 48px 1fr max-content;
  grid-gap: 4px;

  font-weight: 600;
  font-size: 14px;
  line-height: 24px;
  /* identical to box height, or 162% */

  /* White / 01 */

  color: #ffffff;
`;

const Logout = styled.div`
  cursor: pointer;
  color: #c54f4d;
`;

const MenuMobile = ({ open, logout, setOpen, routerToLogin, userInfo }) => {
  const { t } = useTranslation('common');
  const { locale } = useRouter();
  const profilePicture = useMemo(() => {
    if (!userInfo?.loginPicture) return '/images/user.webp';

    if (userInfo?.loginPicture.includes('http')) return userInfo?.loginPicture;

    return FILE_ENDPOINT + userInfo?.loginPicture;
  }, [userInfo?.loginPicture]);

  return (
    <Modal
      scrollable={false}
      show={open}
      backdropClassName={'backdrop-menu'}
      onHide={setOpen}
      bsPrefix='modal right'
      contentClassName={'content-menu'}
      dialogClassName={'modal-menu'}
    >
      <MenuItem>
        <Link href={TALENT_URL + 'search?lang=' + locale} passHref>
          <Item onClick={() => setOpen(false)}>{t('Talents')}</Item>
        </Link>
      </MenuItem>
      {menuMockup.map((_menu, index) => (
        <MenuItem key={index}>
          <Link href={_menu.link} passHref>
            <Item onClick={() => setOpen(false)}>{t(_menu.name)}</Item>
          </Link>
        </MenuItem>
      ))}
      <div className='flex-1'></div>
      {!!userInfo ? (
        <>
          <Profile>
            <div
              style={{
                background: `url('${profilePicture}') center no-repeat`,
                backgroundSize: 'cover',
                height: 48,
                width: 48,
              }}
              className='header-avatar rounded-circle'
              onClick={() => {
                window.location.href = TALENT_URL + `setting?lang=${locale}`;
              }}
            ></div>
            <span className='d-xl-inline-block ms-1 text-transform'>
              {userInfo?.displayName ??
                `${userInfo?.firstName || ''} ${userInfo?.lastName || ''}`}
            </span>
            <Logout onClick={logout}>{t('Logout')}</Logout>
          </Profile>
        </>
      ) : (
        <>
          <Item className='mb-4' onClick={() => routerToLogin('')}>
            {t('Login')}
          </Item>
          <ButtonCreate onClick={() => routerToLogin('/signup')}>
            {t('Create Account')}
          </ButtonCreate>
          <div className='mb-3'></div>
        </>
      )}
    </Modal>
  );
};

export default MenuMobile;
