'use client'

import classNames from 'classnames/bind'
import styles from './Button.module.scss'

const cx = classNames.bind(styles)

type ButtonProps = {
  size?: 'medium' | 'large'
  color?: 'dark' | 'bright'
  children: React.ReactNode
} & React.ComponentPropsWithoutRef<'button'>

const Button = ({
  size = 'medium',
  color = 'dark',
  children,
  ...restProps
}: ButtonProps) => {
  return (
    <button
      {...restProps}
      className={cx('container', size, color)}
    >
      {children}
    </button>
  )
}

export default Button
