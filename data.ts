
import { Song } from './types';

export const MOCK_SONGS: Song[] = [
  {
    id: '1',
    number: 1,
    title: '주 하나님 지으신 모든 세계',
    category: '연중',
    usage: '입당',
    tags: ['찬양', '웅장함'],
    sheets: ['https://picsum.photos/seed/sheet1/800/1100', 'https://picsum.photos/seed/sheet1b/800/1100'],
    composer: '전래 민요'
  },
  {
    id: '2',
    number: 21,
    title: '보아라 우리 주님',
    category: '대림',
    usage: '입당',
    tags: ['기다림', '희망'],
    sheets: ['https://picsum.photos/seed/sheet2/800/1100'],
    composer: '이문근 신부'
  },
  {
    id: '3',
    number: 102,
    title: '그 어린 주 예수',
    category: '성탄',
    usage: '성탄곡',
    tags: ['조용함', '평화'],
    sheets: ['https://picsum.photos/seed/sheet3/800/1100'],
    composer: 'J.E. Spilman'
  },
  {
    id: '4',
    number: 151,
    title: '주여 나를 받으소서',
    category: '사순',
    usage: '봉헌',
    tags: ['참회', '봉헌'],
    sheets: ['https://picsum.photos/seed/sheet4/800/1100'],
    composer: '성 이냐시오의 기도'
  },
  {
    id: '5',
    number: 172,
    title: '할렐루야 주 살아계시다',
    category: '부활',
    usage: '환호',
    tags: ['기쁨', '영광'],
    sheets: ['https://picsum.photos/seed/sheet5/800/1100'],
    composer: 'G.F. Handel'
  },
  {
    id: '6',
    number: 211,
    title: '평화의 기도',
    category: '연중',
    usage: '파견',
    tags: ['평화', '성 프란치스코'],
    sheets: ['https://picsum.photos/seed/sheet6/800/1100'],
    composer: 'Sebastian Temple'
  },
  {
    id: '7',
    number: 405,
    title: '은총의 어머니',
    category: '성모',
    usage: '성모찬송',
    tags: ['성모님', '자애'],
    sheets: ['https://picsum.photos/seed/sheet7/800/1100'],
    composer: '전래 가락'
  }
];

export const CATEGORIES = {
  seasons: ['대림', '성탄', '사순', '부활', '연중', '성령'],
  usages: ['입당', '참회', '자비송', '대영광송', '복음환호송', '봉헌', '성찬', '영성체', '파견'],
  tags: ['찬양', '감사', '평화', '참회', '봉헌', '기쁨', '성모', '성인', '성령']
};
