import { API_ENDPOINT } from 'constants/common';
import { ajax } from 'rxjs/ajax';

const GET_DETAIL = `${API_ENDPOINT}news`;
const GET_RECENTS = `${API_ENDPOINT}news/recent`;
const GET_OTHERS = `${API_ENDPOINT}category/news`;

export function getCastingDetail(loginLanguage, slug) {
  return ajax.get(
    `${GET_DETAIL}?LoginLanguage=${loginLanguage}&SlugURL=${slug}`
  );
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
