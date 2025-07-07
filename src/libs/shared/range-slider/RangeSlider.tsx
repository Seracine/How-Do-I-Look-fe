'use client'

import classNames from 'classnames/bind'
import styles from './RangeSlider.module.scss'
import ReactSlider from 'react-slider'
import Handle from './Handle'

const cx = classNames.bind(styles)

type RangeSliderProps = {
  value: number
  onChange: (value: number) => void
}

const RangeSlider = ({ value, onChange }: RangeSliderProps) => {
  return (
    <div className={cx('container')}>
      <ReactSlider
        min={0}
        max={10}
        value={value}
        onChange={onChange}
        className={cx('slider')}
        renderThumb={({ key, ...props }, state) => (
          <div key={key} {...props} className={cx('thumb')}>
            <div className={cx('thumbInner')}>
              <Handle value={state.valueNow} />
            </div>
          </div>
        )}
        renderTrack={({ key, ...props }, state) => (
          <div
            key={key}
            {...props}
            className={state.index === 0
              ? cx('track', 'trackLower')
              : cx('track', 'trackUpper')}
          />
        )}
      />
    </div>
  )
}

export default RangeSlider
