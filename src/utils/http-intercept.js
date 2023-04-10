import axios from 'axios';
import getConfig from 'next/config';

import { get as _get } from 'lodash';

import { getToken, removeToken } from './localstorage';
import { Configuration, HttpCode, LOGIN_ENDPOINT } from 'constants/common';
const { publicRuntimeConfig } = getConfig();

function formatResponse(response) {
  return response.data;
}

export function handleDataError(error) {
  let message;

  if (error.response) {
    if (error.response.status === HttpCode.Unauthorized) {
      removeToken();
      message = 'Unauthorized';
    } else if (error.response.status === HttpCode.InternalServerError) {
      message = error.response.data?.error || 'Internal Server Error';
    } else {
      message =
        _get(error.response, ['data', 'data', 0, 'message']) ||
        _get(error.response, ['data', 'error']) ||
        _get(error.response, ['data']);
    }
  }

  return { message };
}

function handleBeforeCallApi() {
  // Add a request interceptor
  axios.interceptors.request.use(
    function (config) {
      // Do something before request is sent
      const token = getToken();

      if (token) config.headers.Authorization = `Bearer ${token}`;

      return config;
    },
    function (error) {
      // Do something with request error
      return Promise.reject(error);
    }
  );
}

function handleAfterCallApi() {
  // Add a response interceptor
  axios.interceptors.response.use(
    function (response) {
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data\

      return formatResponse(response);
    },
    function (error) {
      const originalRequest = error.config;
      if (
        error.response.status === 401 &&
        (!originalRequest._retry || originalRequest._retry < 4)
      ) {
        if (!originalRequest._retry) {
          const node = document.createElement('iframe');
          node.src = `${LOGIN_ENDPOINT}/nopromt?${Configuration.QUERY_ACTION}=refresh-token&${Configuration.QUERY_DOMAIN_ORIGIN}=${window.location.origin}`;
          node.className = 'd-none';
          document.body.appendChild(node);
          originalRequest._retry = 1;
        } else originalRequest._retry = originalRequest._retry + 1;
        return setTimeout(() => {
          return axios(originalRequest);
        }, 2000);
      }
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error

      return Promise.reject(handleDataError(error));
    }
  );
}

export function setUpApi() {
  axios.defaults.baseURL = publicRuntimeConfig.authEndpoint;
  axios.defaults.headers.post['Content-Type'] = 'application/json';

  handleBeforeCallApi();

  handleAfterCallApi();
}
