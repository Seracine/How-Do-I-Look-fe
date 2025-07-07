'use client'

import classNames from 'classnames/bind'
import styles from './Pagination.module.scss'
import useUpdateQueryURL from '../util-hook/useUpdateQueryURL'
import Icon from '../icon/Icon'
import Link from 'next/link'
import getPageArray from './getPageArray'
import addScrollIdToURL from './addScrollIdToURL'

const cx = classNames.bind(styles)

type PaginationProps = {
  currentPage: number
  totalPages: number
  scroll?: boolean
  scrollId?: string
}

const Pagination = ({ currentPage, totalPages, scroll = true, scrollId }: PaginationProps) => {
  const pageArray = getPageArray(currentPage, totalPages)
  const { updateQueryURL } = useUpdateQueryURL()

  return (
    <div className={cx('container')}>
      <Link href={addScrollIdToURL(updateQueryURL({ 'page': currentPage - 1 }), scrollId)} className={cx('arrow', 'button', { disabled: currentPage === 1 })} scroll={scroll}>
        <Icon name='arrow' width={8} height={8} alt='이전 페이지' rotate={180} />
      </Link>
      {pageArray.map((pageNum) => {
        return (
          <Link href={addScrollIdToURL(updateQueryURL({ 'page': pageNum }), scrollId)} key={pageNum} className={cx('button', { selected: currentPage === pageNum })} scroll={scroll}>
            <span>{pageNum}</span>
          </Link>
        )
      })}
      <Link href={addScrollIdToURL(updateQueryURL({ 'page': currentPage - 1 }), scrollId)} className={cx('arrow', 'button', { disabled: currentPage === totalPages })} scroll={scroll}>
        <Icon name='arrow' width={8} height={8} alt='다음 페이지' />
      </Link>
    </div>
  )
}

export default Pagination
