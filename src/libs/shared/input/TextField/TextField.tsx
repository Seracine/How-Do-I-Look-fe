import classNames from 'classnames/bind'
import styles from './TextField.module.scss'
import { forwardRef } from 'react'
import Hint from '../Hint/Hint'

const cx = classNames.bind(styles)

export type TextFieldProps = {
  width?: string
  helperText?: string
  className?: string
} & React.ComponentPropsWithoutRef<'input'>

const TextField = forwardRef<HTMLInputElement, TextFieldProps>(({
  disabled,
  width,
  helperText,
  className,
  ...inputProps
}, ref) => {
  return (
    <div className={cx('container')}>
      <div style={{ width }} className={cx('wrapper', { disabled })}>
        <input
          ref={ref}
          disabled={disabled}
          className={cx('input', className)}
          {...inputProps
          }
        />
      </div>
      {helperText && <Hint message={helperText} />}
    </div>
  )
})

TextField.displayName = 'TextField'

export default TextField
