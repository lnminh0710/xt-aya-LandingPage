import axios from 'axios';
import { API_ENDPOINT } from 'constants/common';
import { ajax } from 'rxjs/ajax';

const GET_DETAIL = `${API_ENDPOINT}casting/jobs/details?IdNewsCasting=`;
const GET_RECENTS = `${API_ENDPOINT}news/recent`;
const GET_OTHERS = `${API_ENDPOINT}category/news`;

export function getCastingDetail(loginLanguage, slug) {
  return axios.get(`${GET_DETAIL}${slug}&LoginLanguage=${loginLanguage}`);
}

export function getRecentCasting(
  loginLanguage,
  idRepCastingCategory,
  excludeId
) {
  return ajax.get(
    `${GET_RECENTS}?LoginLanguage=${loginLanguage}&IdRepCastingCategory=${idRepCastingCategory}&ExcludedId=${excludeId}`
  );
}

export function getOtherCasting(
  idRepNewCategory,
  loginLanguage,
  excludeId,
  index,
  size
) {
  return ajax.get(
    `${GET_OTHERS}?IdRepCastingCategory=${idRepNewCategory}&LoginLanguage=${loginLanguage}&ExcludedId=${excludeId}&PageIndex=${index}&PageSize=${size}`
  );
}
