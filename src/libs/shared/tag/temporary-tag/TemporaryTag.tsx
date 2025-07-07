'use client'

import classNames from 'classnames/bind'
import styles from './TemporaryTag.module.scss'
import Icon from '@libs/shared/icon/Icon'

const cx = classNames.bind(styles)

type TemporaryTagProps = {
  tag: string
  onRemove: (tag: string) => void
}

const TemporaryTag = ({ tag, onRemove }: TemporaryTagProps) => {
  return (
    <div className={cx('container')}>
      <span className={cx('text')}>
        {`#${tag}`}
      </span>
      <button
        onClick={(e) => { e.preventDefault(); onRemove(tag) }}
        className={cx('iconWrapper')}
        tabIndex={-1}
        type='button'
      >
        <Icon
          name='cancel'
          width={12}
          height={12}
          alt='취소 버튼'
        />
      </button>
    </div>
  )
}

export default TemporaryTag
