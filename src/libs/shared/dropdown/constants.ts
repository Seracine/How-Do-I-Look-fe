import { SortBy, SearchByCurating, SearchByStyle } from '@services/types'

export const SORT_BY_FILTERS = [
  {
    data: SortBy.latest,
    text: '최신순',
  },
  {
    data: SortBy.mostViewed,
    text: '조회순',
  },
  {
    data: SortBy.mostCurated,
    text: '큐레이팅순',
  },
]

export const SEARCH_BY_STYLE_FILTERS = [
  {
    data: SearchByStyle.nickname,
    text: '닉네임',
  },
  {
    data: SearchByStyle.title,
    text: '제목',
  },
  {
    data: SearchByStyle.content,
    text: '상세',
  },
  {
    data: SearchByStyle.tag,
    text: '태그',
  },
]

export const SEARCH_BY_CURATING_FILTERS = [
  {
    data: SearchByCurating.nickname,
    text: '닉네임',
  },
  {
    data: SearchByCurating.content,
    text: '상세',
  },
]
