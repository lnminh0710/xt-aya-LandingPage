export const parseKNumber = (data) => {
  if (typeof data !== 'number') data = parseInt(data);

  if (data > 1000000) return '1M+';
  if (data > 100000) return '100K+';
  if (data > 1000) return '10K+';
  if (data > 1000) return '1K+';
  return data;
};

export const convertLanguageCode = (locale) => {
  switch (locale) {
    case 'en':
      return 2;

    default:
      return 1;
  }
};
