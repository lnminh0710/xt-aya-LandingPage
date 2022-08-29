export const getArticlesFromResponse = (dataList) => {
  let res = [];
  if (!dataList?.length) return res;

  for (let index = 0; index < dataList.length; index++) {
    const element = dataList[index];
    const dataString = element?.SelectedLanguage
      ? element?.SelectedLanguage
      : element?.DefaultLanguage;

    if (!dataString) continue;

    const data = JSON.parse(dataString);
    if (!data?.length) continue;

    res.push(data[0]);
  }
  return res;
};
