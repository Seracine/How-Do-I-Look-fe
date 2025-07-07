'use client'

import classNames from 'classnames/bind'
import styles from './ConfirmModal.module.scss'
import { forwardRef } from 'react'
import Icon from '@libs/shared/icon/Icon'
import Button from '@libs/shared/button/Button'

const cx = classNames.bind(styles)

type ConfirmModalProps = {
  // title: string
  description: string
  onClose: () => void
  hasBackdrop?: boolean
} & React.ComponentPropsWithoutRef<'dialog'>

const ConfirmModal = forwardRef<HTMLDialogElement, ConfirmModalProps>(({
  // title,
  description,
  onClose,
  hasBackdrop = true,
  ...restProps
}, ref) => {
  return (
    <dialog
      className={cx('dialog', { hasBackdrop })}
      ref={ref}
      onKeyDown={(e) => { if (e.key === 'Escape') onClose() }}
      {...restProps}
    >
      <div className={cx('container')}>
        <button
          type='button'
          className={cx('closeButton')}
          onClick={() => { onClose() }}
        >
          <Icon name='close' width={28} height={28} alt='모달 닫기 아이콘' />
        </button>
        <p className={cx('description')}>
          {description}
        </p>
        <div className={cx('buttonWrapper')}>
          <Button type='button' onClick={() => { onClose() }}>확인</Button>
        </div>
      </div>
    </dialog>
  )
})

ConfirmModal.displayName = 'ConfirmModal'

export default ConfirmModal
