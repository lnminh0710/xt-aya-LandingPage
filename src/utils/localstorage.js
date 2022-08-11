import {
  LOCAL_STORAGE_IS_LOGGED,
  LOCAL_STORAGE_TOKEN,
  LOCAL_STORAGE_UID,
} from 'constants/common';

export const setToken = (token) => {
  localStorage.setItem(LOCAL_STORAGE_TOKEN, token);
};

export const getToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem(LOCAL_STORAGE_TOKEN);
  }

  return;
};

export const removeToken = () => {
  localStorage.removeItem(LOCAL_STORAGE_TOKEN);
};

export const setUid = (id) => {
  localStorage.setItem(LOCAL_STORAGE_UID, id);
};

export const getUid = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem(LOCAL_STORAGE_UID);
  }

  return;
};

export const removeUid = () => {
  localStorage.removeItem(LOCAL_STORAGE_UID);
};

export const setLogged = () => {
  localStorage.setItem(LOCAL_STORAGE_IS_LOGGED, 'true');
};

export const getLogged = () => {
  return localStorage.getItem(LOCAL_STORAGE_IS_LOGGED);
};

export const removeLogged = () => {
  localStorage.removeItem(LOCAL_STORAGE_IS_LOGGED);
};
