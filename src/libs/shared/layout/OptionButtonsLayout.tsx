'use client'

import classNames from 'classnames/bind'
import styles from './OptionButtonsLayout.module.scss'

const cx = classNames.bind(styles)

type OptionButtonsLayoutProps = {
  onClickEdit: () => void
  onClickDelete: () => void
}

const OptionButtonsLayout = ({ onClickEdit, onClickDelete }: OptionButtonsLayoutProps) => {
  return (
    <div className={cx('container')}>
      <button onClick={onClickEdit} className={cx('button')}>수정하기</button>
      <button onClick={onClickDelete} className={cx('button')}>삭제하기</button>
    </div>
  )
}

export default OptionButtonsLayout
