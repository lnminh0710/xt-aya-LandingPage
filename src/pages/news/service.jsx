import { API_ENDPOINT } from 'constants/common';
import { ajax } from 'rxjs/ajax';

const GET_RECENTS = `${API_ENDPOINT}news/recent`;
const GET_HIGH_LIGHT = `${API_ENDPOINT}news/highlight`;
const GET_CATEGORIES = `${API_ENDPOINT}category`;
const GET_NEW_BY_CATEGORY = `${API_ENDPOINT}category/news`;

export function getRecents(idLanguage) {
  return ajax.get(`${GET_RECENTS}?LoginLanguage=${idLanguage}`);
}

export function getHightLight(idLanguage) {
  return ajax.get(`${GET_HIGH_LIGHT}?LoginLanguage=${idLanguage}`);
}

export function getCategories(idLanguage) {
  return ajax.get(`${GET_CATEGORIES}?LoginLanguage=${idLanguage}`);
}

export function getNewsByCategory(slugURL, idLanguage, index, size) {
  return ajax.get(
    `${GET_NEW_BY_CATEGORY}?CategorySlugURL=${slugURL}&LoginLanguage=${idLanguage}&PageIndex=${index}&PageSize=${size}`
  );
}
