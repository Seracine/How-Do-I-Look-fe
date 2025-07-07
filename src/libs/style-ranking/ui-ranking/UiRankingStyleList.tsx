import classNames from 'classnames/bind'
import styles from './UiRankingStyleList.module.scss'
import { RankingStyle } from '@services/types'
import RankingCard from '@libs/style-ranking/ui-ranking/RankingCard'
import Pagination from '@libs/shared/pagination/Pagination'
import EmptyData from '@libs/shared/empty-data/EmptyData'

const cx = classNames.bind(styles)

type UiRankingStyleListProps = {
  styles: RankingStyle[]
  currentPage: number
  totalPages: number
}

const UiRankingStyleList = ({ styles, currentPage, totalPages }: UiRankingStyleListProps) => {

  if (styles.length === 0) return (
    <div className={cx('emptyStyleWrapper')}>
      <EmptyData text='아직 스타일이 없어요' />
    </div>
  )

  return (
    <>
      <div className={cx('styleListWrapper')}>
        {styles.map((style) => (
          <RankingCard card={style} key={style.id} />
        ))}
      </div>
      <div className={cx('paginationWrapper')}>
        <Pagination currentPage={currentPage} totalPages={totalPages} />
      </div>
    </>
  )
}

export default UiRankingStyleList
