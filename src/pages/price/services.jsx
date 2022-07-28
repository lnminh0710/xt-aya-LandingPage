import { API_ENDPOINT } from 'constants/common';
import { ajax } from 'rxjs/ajax';

const GET_CONFIG = `${API_ENDPOINT}config`;

export function getConfigs() {
  return ajax.get(`${GET_CONFIG}`);
}
