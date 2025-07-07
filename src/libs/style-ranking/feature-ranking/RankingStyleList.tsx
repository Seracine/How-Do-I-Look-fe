import { RankingStylesSearchParams } from '@services/types'
import UiRankingStyleList from '../ui-ranking/UiRankingStyleList'
import getRankingStyles from '../data-access-ranking/getRankingStyles'

type RankingStyleListProps = {
  searchParams: RankingStylesSearchParams
}

const RankingStyleList = async ({ searchParams }: RankingStyleListProps) => {
  const { data: styles, currentPage, totalPages } = await getRankingStyles(searchParams)

  return (
    <UiRankingStyleList styles={styles} currentPage={currentPage} totalPages={totalPages} />
  )
}

export default RankingStyleList
