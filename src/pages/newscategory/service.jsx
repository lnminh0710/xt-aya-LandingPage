import { API_ENDPOINT } from 'constants/common';
import { ajax } from 'rxjs/ajax';

const GET_NEWS_BY_CATEGORY = `${API_ENDPOINT}category/news`;
const GET_RECENTS = `${API_ENDPOINT}news/recent`;
const GET_CATEGORY_BY_SLUG = `${API_ENDPOINT}category`;

export function getNewsByCategory(loginLanguage, slugUrl, index, size) {
  return ajax.get(
    `${GET_NEWS_BY_CATEGORY}?LoginLanguage=${loginLanguage}&CategorySlugURL=${slugUrl}&PageIndex=${index}&PageSize=${size}`
  );
}

export function getRecentsByCategory(loginLanguage, slugUrl) {
  return ajax.get(
    `${GET_RECENTS}?LoginLanguage=${loginLanguage}&CategorySlugURL=${slugUrl}`
  );
}

export function getCategoryBySlug(loginLanguage, slugUrl) {
  return ajax.get(
    `${GET_CATEGORY_BY_SLUG}?LoginLanguage=${loginLanguage}&CategorySlugURL=${slugUrl}`
  );
}
