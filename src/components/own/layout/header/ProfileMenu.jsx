import React, { useCallback, useState } from 'react';
import { Dropdown } from 'react-bootstrap';

//i18n

// users
import produce from 'immer';
import { ChevronDownIcon, UserIcon } from 'assets/svg';
import Image from 'next/image';
import { FILE_ENDPOINT, TALENT_URL } from 'constants/common';
import { useMemo } from 'react';
import { useTranslation } from 'next-i18next';
import { getToken, getUid } from 'utils/localstorage';

const ProfileMenu = ({ logout, userInfo }) => {
  const { t } = useTranslation('common');

  const profilePicture = useMemo(() => {
    if (!userInfo?.loginPicture) return '/images/user.webp';

    if (userInfo?.loginPicture.includes('http')) return userInfo?.loginPicture;

    return FILE_ENDPOINT + userInfo?.loginPicture;
  }, [userInfo?.loginPicture]);
  return (
    <Dropdown className='d-inline-block user-dropdown'>
      <Dropdown.Toggle
        tag='button'
        className='btn header-item waves-effect'
        id='page-header-user-dropdown'
      >
        {/* <img className="rounded-circle header-profile-user me-1" src={userInfo?.avatar || defaultAvatar} alt="" /> */}
        <span className='d-xl-inline-block ms-1 text-transform'>
          {userInfo?.displayName ??
            `${userInfo?.firstName} ${userInfo?.lastName}`}
        </span>
        <div
          style={{
            background: `url(${profilePicture}) center no-repeat`,
            backgroundSize: 'cover',
            height: 48,
            width: 48,
          }}
          className='header-avatar rounded-circle'
        ></div>
        {/* <Image
          src={profilePicture}
          layout='responsive'
          objectFit='cover'
          alt='user-login-picture'
          className='header-avatar rounded-circle'
          width={48}
          height={48}
        /> */}
        <ChevronDownIcon />
      </Dropdown.Toggle>
      <Dropdown.Menu className='dropdown-menu-end'>
        <Dropdown.Item
          href={`${TALENT_URL}setting?at=${getToken()}&uid=${getUid()}`}
        >
          <i className='ri-user-line align-middle me-1'></i>{' '}
          {' Go to My Aya Talent'}
        </Dropdown.Item>
        <Dropdown.Item className='text-danger' onClick={logout}>
          <i className='ri-shut-down-line align-middle me-1 text-danger'></i>{' '}
          {t('Logout')}
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};
export default ProfileMenu;
