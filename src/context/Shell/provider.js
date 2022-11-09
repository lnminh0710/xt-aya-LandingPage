import { useCallback, useEffect, useMemo, useState } from 'react';
import SSRProvider from 'react-bootstrap/SSRProvider';
import axios from 'axios';

import { CommonContext } from './context';
import Gallery from 'components/own/gallery/Gallery';
import produce from 'immer';
import { getToken } from 'utils/localstorage';

export const ShellProvider = ({ children }) => {
  const [{ userInfo, showGallery, dataGallery, indexGallery }, setState] =
    useState({
      userInfo: null,
      showGallery: false,
      dataGallery: [],
      indexGallery: 0,
    });

  const logIn = useCallback((data) => {}, []);

  const logOut = useCallback(async () => {}, []);

  const createAccount = useCallback(async (data) => {}, []);
  const getUserProfile = useCallback((callback) => {
    if (callback) callback();
    const token = getToken();
    if (token) {
      axios.get('users/profile').then((res) => {
        setState(
          produce((draft) => {
            draft.userInfo = res;
          })
        );
      });
    } else {
      setState(
        produce((draft) => {
          draft.userInfo = null;
        })
      );
    }
  }, []);

  const openGallery = useCallback((open, data = [], index = 0) => {
    const header = document.getElementById('header-sticky');
    if (open) {
      if (header) header.style.zIndex = 1;
    } else {
      if (header) header.style.zIndex = 10000;
    }

    setState(
      produce((draft) => {
        draft.dataGallery = data;
        draft.indexGallery = index;
        draft.showGallery = open;
      })
    );
  }, []);

  useEffect(() => {
    getUserProfile();
  }, [getUserProfile]);

  const value = useMemo(
    () => ({
      userInfo,
      logIn,
      logOut,
      createAccount,
      openGallery,
      getUserProfile,
    }),
    [userInfo, logIn, logOut, createAccount, openGallery, getUserProfile]
  );

  return (
    <SSRProvider>
      <Gallery
        data={dataGallery}
        index={indexGallery}
        show={showGallery}
        onClose={openGallery}
      />
      <CommonContext.Provider value={value}>{children}</CommonContext.Provider>
    </SSRProvider>
  );
};
