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

    data[0].CategroySlugURL =
      data[0]?.['dbo.B12NewsLanguage']?.[0]?.['dbo.B12RepNewsCategory']?.[
        '0'
      ]?.CategroySlugURL;
    data[0].Title = data[0]?.['dbo.B12NewsLanguage']?.[0]?.Title;
    data[0].Picture = data[0]?.['dbo.B12NewsLanguage']?.[0]?.Picture;
    data[0].Teaser = data[0]?.['dbo.B12NewsLanguage']?.[0]?.Teaser;
    data[0].NewsContent = data[0]?.['dbo.B12NewsLanguage']?.[0]?.NewsContent;
    res.push(data[0]);
  }
  return res;
};
