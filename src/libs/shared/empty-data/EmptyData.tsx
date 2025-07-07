import classNames from 'classnames/bind'
import styles from './EmptyData.module.scss'
import Icon from '../icon/Icon'

const cx = classNames.bind(styles)

type EmptyDataProps = {
  text: string
}

const EmptyData = ({ text }: EmptyDataProps) => {
  return (
    <div className={cx('container')}>
      <div className={cx('iconWrapper')}>
        <Icon name='empty-data' width={249} height={157} alt='데이터 없음' />
      </div>
      <p className={cx('text')}>{text}</p>
    </div>
  )
}

export default EmptyData
