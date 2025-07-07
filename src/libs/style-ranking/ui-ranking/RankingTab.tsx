'use client'

import classNames from 'classnames/bind'
import styles from './RankingTab.module.scss'
import useUpdateQueryURL from '../../shared/util-hook/useUpdateQueryURL'
import Link from 'next/link'
import { RankBy } from '@services/types'
import { RANK_BY_LIST } from '../util-constants/constants'

const cx = classNames.bind(styles)

type RankingTabProps = {
  currentRankBy: RankBy
}

const RankingTab = ({ currentRankBy }: RankingTabProps) => {
  const { updateQueryURL } = useUpdateQueryURL()

  return (
    <div className={cx('container')}>
      {
        RANK_BY_LIST.map((element) => {
          const selected = currentRankBy === element.data
          return (
            <Link
              href={updateQueryURL({ 'rankBy': element.data })}
              key={element.data}
              className={cx('menu', { selected })}
            >
              {element.text}
            </Link>
          )
        })
      }
    </div>
  )
}

export default RankingTab
