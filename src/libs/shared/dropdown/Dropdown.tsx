'use client'

import classNames from 'classnames/bind'
import styles from './Dropdown.module.scss'
import Icon from '../icon/Icon'
import usePopover from './usePopover'
import { useRef } from 'react'

const cx = classNames.bind(styles)

type DropdownProps<T> = {
  filters: {
    text: string
    data: T
  }[]
  currentData: T
  onSelect: (data: T) => void
}

const Dropdown = <T extends string>({ filters, currentData, onSelect }: DropdownProps<T>) => {
  const selectedFilter = filters.find((filter) => filter.data === currentData)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const { popoverRef, isOpened, closePopover, togglePopover } = usePopover(triggerRef)

  return (
    <div className={cx('container')}>
      <button
        type='button'
        onClick={() => {
          togglePopover()
        }}
        ref={triggerRef}
        className={cx('trigger')}
      >
        <p className={cx('selectedOption')}>{selectedFilter?.text}</p>
        <div className={cx('iconWrapper')}>
          <Icon name='toggle-arrow' width={12} height={8} alt='드롭다운 화살표' rotate={isOpened ? 180 : 360} />
        </div>
      </button>
      <dialog className={cx('popup')} ref={popoverRef}>
        <div className={cx('selectMenu')}>
          {filters.map((filter) => {
            return (
              <button type='button' onClick={(e) => { e.stopPropagation(); onSelect(filter.data); closePopover() }} key={filter.data} className={cx('item')}>
                <p className={cx('text')}>{filter.text}</p>
              </button>
            )
          })}
        </div>
      </dialog>
    </div>
  )
}

export default Dropdown
