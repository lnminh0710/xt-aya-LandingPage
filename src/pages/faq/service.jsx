import { API_ENDPOINT } from 'constants/common';
import { ajax } from 'rxjs/ajax';

const GET_FAQs = `${API_ENDPOINT}FAQ`;

export function getFaqs(idLanguage) {
  return ajax.get(`${GET_FAQs}?LoginLanguage=${idLanguage}`);
}
