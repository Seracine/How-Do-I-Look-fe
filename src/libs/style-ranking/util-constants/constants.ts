import { RankBy } from '@services/types'

export const RANK_BY_LIST = [
  {
    data: RankBy.total,
    text: '전체',
  },
  {
    data: RankBy.trendy,
    text: '트렌디',
  },
  {
    data: RankBy.personality,
    text: '개성',
  },
  {
    data: RankBy.practicality,
    text: '실용성',
  },
  {
    data: RankBy.costEffectiveness,
    text: '가성비',
  },
]
