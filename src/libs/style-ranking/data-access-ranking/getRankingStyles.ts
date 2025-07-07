'use server'

import { getRankingStyles as getRankingStylesApi } from '@services/api'
import { RankingStylesSearchParams } from '@services/types'

const getRankingStyles = async ({ rankBy, page }: RankingStylesSearchParams) => {
  const response = await getRankingStylesApi({ rankBy, page })
  return response
}

export default getRankingStyles
