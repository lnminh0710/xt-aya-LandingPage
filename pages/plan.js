import { API_ENDPOINT, TALENT_URL } from 'constants/common';
import { ConfigsConstant } from 'constants/configs';
import { getLanguageKey, LanguageConstant } from 'constants/languages';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Price from 'pages/price/Price';

const PlanPage = ({ data }) => <Price data={data} />;

export const getStaticProps = async ({ locale }) => {
  const res = await fetch(API_ENDPOINT + 'config');
  const dataJson = await res.json();

  const currentLang = getLanguageKey(locale);
  const priceText = dataJson?.find(
    (x) => x.ParamKey === ConfigsConstant.PRICE_TEXT
  );

  const priceTextTrans =
    currentLang === LanguageConstant.VI
      ? priceText?.ParamValueVN
      : priceText?.ParamValueEN;

  const data = [
    {
      id: 2,
      name: 'free',
      price: 'freePrice',
      outStanding: false,
      urlJoin: TALENT_URL + '/setting',
      data: [
        {
          id: 1,
          isCheck: true,
          content: '',
          permissionName: 'eprofile',
          permissionDes: 'eprofile',
        },
        {
          id: 2,
          isCheck: false,
          content: '',
          permissionName: 'ranking',
          permissionDes: 'ranking',
        },
        {
          id: 3,
          isCheck: false,
          content: '5',
          permissionName: 'photoOnEProfile',
          permissionDes: 'photoOnEProfile',
        },
        {
          id: 4,
          isCheck: false,
          content: '',
          permissionName: 'teaserPhoto',
          permissionDes: 'teaserPhoto',
        },
        {
          id: 5,
          isCheck: false,
          content: '',
          permissionName: 'externalLink',
          permissionDes: 'externalLink',
        },
        // {
        //   id: 6,
        //   isCheck: false,
        //   content: '',
        //   permissionName: 'showreel',
        //   permissionDes: 'showreel',
        // },
        // {
        //   id: 7,
        //   isCheck: false,
        //   content: '',
        //   permissionName: 'updateShowreel',
        //   permissionDes: 'updateShowreel',
        // },
        {
          id: 8,
          isCheck: false,
          content: '',
          permissionName: 'aboutMeVideo',
          permissionDes: 'aboutMeVideo',
        },
        // {
        //   id: 9,
        //   isCheck: false,
        //   content: '',
        //   permissionName: 'searchCastDirector',
        //   permissionDes: 'searchCastDirector',
        // },
        // {
        //   id: 10,
        //   isCheck: false,
        //   content: '',
        //   permissionName: 'messaging',
        //   permissionDes: 'messaging',
        // },
        {
          id: 11,
          isCheck: false,
          content: '',
          permissionName: 'castingLetter',
          permissionDes: 'castingLetter',
        },
        // {
        //   id: 12,
        //   isCheck: false,
        //   content: '',
        //   permissionName: 'analyticsTools',
        //   permissionDes: 'analyticsTools',
        // },
        // {
        //   id: 13,
        //   isCheck: false,
        //   content: '',
        //   permissionName: 'webCard',
        //   permissionDes: 'webCard',
        // },
        // {
        //   id: 14,
        //   isCheck: false,
        //   content: '',
        //   permissionName: 'onlineShop',
        //   permissionDes: 'onlineShop',
        // },
      ],
    },
    {
      id: 1,
      name: 'pro',
      price: priceTextTrans,
      outStanding: true,
      urlJoin: TALENT_URL + '/setting',
      data: [
        {
          id: 1,
          isCheck: true,
          content: '',
          permissionName: 'eprofile',
          permissionDes: 'eprofile',
        },
        {
          id: 2,
          isCheck: true,
          content: '',
          permissionName: 'ranking',
          permissionDes: 'ranking',
        },
        {
          id: 3,
          isCheck: false,
          content: '20',
          permissionName: 'photoOnEProfile',
          permissionDes: 'photoOnEProfile',
        },
        {
          id: 4,
          isCheck: false,
          content: '3',
          permissionName: 'teaserPhoto',
          permissionDes: 'teaserPhoto',
        },
        {
          id: 5,
          isCheck: false,
          content: '10',
          permissionName: 'externalLink',
          permissionDes: 'externalLink',
        },
        // {
        //   id: 6,
        //   isCheck: true,
        //   content: '',
        //   permissionName: 'showreel',
        //   permissionDes: 'showreel',
        // },
        // {
        //   id: 7,
        //   isCheck: true,
        //   content: '',
        //   permissionName: 'updateShowreel',
        //   permissionDes: 'updateShowreel',
        // },
        {
          id: 8,
          isCheck: true,
          content: '',
          permissionName: 'aboutMeVideo',
          permissionDes: 'aboutMeVideo',
        },
        // {
        //   id: 9,
        //   isCheck: true,
        //   content: '',
        //   permissionName: 'searchCastDirector',
        //   permissionDes: 'searchCastDirector',
        // },
        // {
        //   id: 10,
        //   isCheck: true,
        //   content: '',
        //   permissionName: 'messaging',
        //   permissionDes: 'messaging',
        // },
        {
          id: 11,
          isCheck: true,
          content: '',
          permissionName: 'castingLetter',
          permissionDes: 'castingLetter',
        },
        // {
        //   id: 12,
        //   isCheck: true,
        //   content: '',
        //   permissionName: 'analyticsTools',
        //   permissionDes: 'analyticsTools',
        // },
        // {
        //   id: 13,
        //   isCheck: true,
        //   content: '',
        //   permissionName: 'webCard',
        //   permissionDes: 'webCard',
        // },
        // {
        //   id: 14,
        //   isCheck: true,
        //   content: '',
        //   permissionName: 'onlineShop',
        //   permissionDes: 'onlineShop',
        // },
      ],
    },
  ];
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'price'])),
      data: data,
    },
  };
};

export default PlanPage;
