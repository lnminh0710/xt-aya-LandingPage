import { FilterControlTypes } from 'constants/field';

export const talentFilterMockup = [
  {
    name: 'orderBy',
    title: 'Sort By',
    controlType: FilterControlTypes.SELECT_PICKER,
    options: [
      { label: 'A-Z', value: 'nameDesc' },
      { label: 'Z-A', value: 'nameEsc' },
    ],
  },
  {
    name: 'gender',
    title: 'Gender',
    controlType: FilterControlTypes.SELECT_PICKER,
    options: [
      { label: 'Male', value: 1 },
      { label: 'Female', value: 2 },
      { label: 'Unknown', value: 3 },
    ],
  },
  {
    name: 'ethnicTypes',
    title: 'Ethnic types',
    controlType: FilterControlTypes.SELECT_PICKER,
    options: [],
  },
  {
    name: 'language',
    title: 'Language',
    controlType: FilterControlTypes.SELECT_PICKER,
    options: [
      { label: 'Vietnamese', value: 'vi' },
      { label: 'English', value: 'en' },
    ],
  },
  {
    name: 'age',
    title: 'Age from',
    controlType: FilterControlTypes.SLIDE,
    min: 18,
    max: 80,
  },
  {
    name: 'weight',
    title: 'Weight:',
    controlType: FilterControlTypes.SLIDE,
    min: 40,
    max: 99,
  },
];

export const talentDataMockup = [
  {
    name: 'Lâm Vissay',
    gender: 'Male',
    country: 'Vietnam',
    rating: 5,
    follower: 10000000,
    avatar: '/images/will_removed/Image.webp',
  },

  {
    name: 'Ninh Dương Lan Ngọc',
    gender: 'Female',
    country: 'Vietnam',
    rating: 5,
    follower: 1000000,
    avatar: '/images/will_removed/Image-1.webp',
  },
  {
    name: 'Diễm My',
    gender: 'Female',
    country: 'Vietnam',
    rating: 5,
    follower: 1000000,
    avatar: '/images/will_removed/Image-2.webp',
  },
  {
    name: 'Diễm My',
    gender: 'Female',
    country: 'Vietnam',
    rating: 5,
    follower: 10000000,
    avatar: '/images/will_removed/Image-3.webp',
  },
  {
    name: 'Minh Hằng',
    gender: 'Female',
    country: 'Vietnam',
    rating: 5,
    follower: 10000000,
    avatar: '/images/will_removed/Image-4.webp',
  },
  {
    name: 'Chi Pu',
    gender: 'Female',
    country: 'Vietnam',
    rating: 5,
    follower: 1000000,
    avatar: '/images/will_removed/Image-5.webp',
  },

  {
    name: 'Bình Minh',
    gender: 'Male',
    country: 'Vietnam',
    rating: 5,
    follower: 10000000,
    avatar: '/images/will_removed/Image-6.webp',
  },
  {
    name: 'Mạnh Trường',
    gender: 'Male',
    country: 'Vietnam',
    rating: 5,
    follower: 10000000,
    avatar: '/images/will_removed/Image-7.webp',
  },

  {
    name: 'Kim Lý',
    gender: 'Male',
    country: 'Vietnam',
    rating: 5,
    follower: 10000000,
    avatar: '/images/will_removed/Image-8.webp',
  },
  {
    name: 'Hứa Minh Đạt',
    gender: 'Male',
    country: 'Vietnam',
    rating: 5,
    follower: 10000000,
    avatar: '/images/will_removed/Image-9.webp',
  },
  {
    name: 'Nhan Phúc Vinh',
    gender: 'Male',
    country: 'Vietnam',
    rating: 5,
    follower: 10000000,
    avatar: '/images/will_removed/Image-10.webp',
  },
  {
    name: 'Tuấn Trần',
    gender: 'Male',
    country: 'Vietnam',
    rating: 5,
    follower: 10000000,
    avatar: '/images/will_removed/Image-11.webp',
  },
];
