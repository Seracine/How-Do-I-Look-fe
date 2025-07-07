import classNames from 'classnames/bind'
import styles from './FormModal.module.scss'
import { forwardRef } from 'react'
import Icon from '@libs/shared/icon/Icon'

const cx = classNames.bind(styles)

type FormModalProps = {
  title: string
  content?: React.ReactNode
  onClose: () => void
} & Omit<React.ComponentPropsWithoutRef<'dialog'>, 'content'>

const FormModal = forwardRef<HTMLDialogElement, FormModalProps>(({
  title,
  onClose,
  content,
  ...restProps
}, ref) => {
  return (
    <dialog
      className={cx('dialog')}
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
        <p className={cx('title')}>
          {title}
        </p>
        {content}
      </div>
    </dialog>
  )
})

FormModal.displayName = 'FormModal'

export default FormModal
