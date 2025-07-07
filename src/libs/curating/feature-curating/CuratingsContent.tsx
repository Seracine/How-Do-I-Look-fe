import { CuratingType } from '@services/types'
import classNames from 'classnames/bind'
import styles from './CuratingsContent.module.scss'
import Divider from '@libs/shared/layout/Divider'
import Curating from './Curating'
import Pagination from '@libs/shared/pagination/Pagination'
import { Fragment } from 'react'
import EmptyData from '@libs/shared/empty-data/EmptyData'

const cx = classNames.bind(styles)

type CuratingsContentProps = {
  curatings: CuratingType[]
  currentPage: number
  totalPages: number
}

const CuratingsContent = ({ curatings, currentPage, totalPages }: CuratingsContentProps) => {
  const curatingsLength = curatings.length

  return (
    <>
      <div className={cx('contentContainer')}>
        <Divider marginBlock='0' color='black' />
        {curatings.map((curating, idx) => (
          <Fragment key={curating.id}>
            <Curating curating={curating} />
            {(idx + 1 < curatingsLength) && <Divider marginBlock='0' color='gray' />}
          </Fragment>
        ))}
        {curatingsLength === 0 && (
          <div className={cx('emptyDataWrapper')}>
            <EmptyData text='아직 큐레이션이 없어요' />
          </div>
        )}
        <Divider marginBlock='0' color='black' />
      </div>
      {curatings.length > 0 && (
        <div className={cx('paginationWrapper')}>
          <Pagination currentPage={currentPage} totalPages={totalPages} scrollId='curating' />
        </div>
      )}
    </>
  )
}

export default CuratingsContent
