import { API_ENDPOINT } from 'constants/common';
import { ajax } from 'rxjs/ajax';

const SUBMIT_CONTACT = `${API_ENDPOINT}contact-support/member`;

export function subtmitContact(data) {
  return ajax.post(SUBMIT_CONTACT, data);
}
