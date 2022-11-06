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

export const iOS = () => {
  if (/iPad|iPhone|iPod/.test(navigator.platform)) {
    return true;
  }
  return (
    (navigator.maxTouchPoints &&
      navigator.maxTouchPoints > 2 &&
      /MacIntel/.test(navigator.platform)) ||
    [
      'iPad Simulator',
      'iPhone Simulator',
      'iPod Simulator',
      'iPad',
      'iPhone',
      'iPod',
      'MacIntel',
    ].includes(navigator.platform) ||
    // iPad on iOS 13 detection
    (navigator.userAgent.includes('Mac') && 'ontouchend' in document)
  );
};
