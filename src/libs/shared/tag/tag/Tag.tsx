'use client'

import classNames from 'classnames/bind'
import styles from './Tag.module.scss'
import Link from 'next/link'
import useUpdateQueryURL from '@libs/shared/util-hook/useUpdateQueryURL'
import { useSearchParams } from 'next/navigation'

const cx = classNames.bind(styles)

type TagProps = {
  value: string
}

const Tag = ({ value }: TagProps) => {
  const { updateQueryURL } = useUpdateQueryURL()
  const searchParams = useSearchParams()
  const selected = searchParams.get('tag') === value || (value === '' && !searchParams.get('tag'))

  return (
    <Link href={updateQueryURL({ 'tag': value })} className={cx('container', { selected })} scroll={false}>
      <span className={cx('text')}>{value === '' ? '전체' : `#${value}`}</span>
    </Link>
  )
}

export default Tag
