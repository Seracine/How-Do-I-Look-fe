import classNames from 'classnames/bind'
import styles from './page.module.scss'
import MainLayout from '@libs/shared/layout/MainLayout'
import RankingTab from '@libs/style-ranking/ui-ranking/RankingTab'
import RankingStyleList from '@libs/style-ranking/feature-ranking/RankingStyleList'
import { RankBy } from '@services/types'
import convertPageParamToNumber from '@libs/shared/util-util/convertPageParamToNumber'
import { META_RANKING } from '@app/_meta'

const cx = classNames.bind(styles)

type RankingPageProps = {
  searchParams: Partial<{
    page: string
    rankBy: string
  }>
}

const RankingPage = ({ searchParams }: RankingPageProps) => {
  const {
    page: pageParam,
    rankBy: rankByParam,
  } = searchParams
  const page = convertPageParamToNumber(pageParam)
  const rankBy = RankBy[rankByParam as keyof typeof RankBy] || RankBy.total

  return (
    <MainLayout title='랭킹' titleMarginBottom='64px'>
      <div className={cx('tabWrapper')}>
        <RankingTab currentRankBy={rankBy} />
      </div>
      <RankingStyleList searchParams={{ page, rankBy }} />
    </MainLayout>
  )
}

export const revalidate = 0
export const metadata = META_RANKING
export default RankingPage
