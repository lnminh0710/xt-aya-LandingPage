import { useCallback, useMemo, useState } from 'react';
import SSRProvider from 'react-bootstrap/SSRProvider';

import { CommonContext } from './context';
import Gallery from 'components/own/gallery/Gallery';
import produce from 'immer';

export const ShellProvider = ({ children }) => {
  const [{ clientInfo, showGallery, dataGallery, indexGallery }, setState] =
    useState({
      clientInfo: null,
      showGallery: false,
      dataGallery: [],
      indexGallery: 0,
    });

  const logIn = useCallback((data) => {}, []);

  const logOut = useCallback(async () => {}, []);

  const createAccount = useCallback(async (data) => {}, []);

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

  const value = useMemo(
    () => ({
      clientInfo,
      logIn,
      logOut,
      createAccount,
      openGallery,
    }),
    [clientInfo, createAccount, logIn, logOut, openGallery]
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
