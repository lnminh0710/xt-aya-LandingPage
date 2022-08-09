import { LOCAL_STORAGE_TOKEN } from 'constants/common';

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
