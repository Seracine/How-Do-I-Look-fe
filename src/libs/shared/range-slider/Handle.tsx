import classNames from 'classnames/bind'
import styles from './Handle.module.scss'
import Icon from '../icon/Icon'

const cx = classNames.bind(styles)

type HandleProps = {
  value: number
}

const Handle = ({ value }: HandleProps) => {
  return (
    <div className={cx('container')}>
      <Icon name='slider-handle' width={20} height={23} alt='슬라이더 핸들 아이콘' />
      <div className={cx('value')}>{value}</div>
    </div>
  )
}

export default Handle
