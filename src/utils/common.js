import { isEqual } from 'lodash';

export const checkProperties = (prev, next) => {
  const keys = Object.keys(prev);
  for (const key in keys) {
    if (Object.hasOwnProperty.call(keys, key)) {
      const element = keys[key];
      if (typeof prev[element] === 'function') continue;
      if (!isEqual(prev[element], next[element])) {
        return false;
      }
    }
  }

  return true;
};
