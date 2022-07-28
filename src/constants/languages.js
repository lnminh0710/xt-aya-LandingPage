export const LanguageConstant = {
  VI: 1,
  EN: 2,
};

export function getLanguageKey(lang) {
  let key = 0;
  switch (lang) {
    case 'vi':
      key = LanguageConstant.VI;
      break;
    case 'en':
      key = LanguageConstant.EN;
      break;
    default:
      key = LanguageConstant.VI;
      break;
  }
  return key;
}
