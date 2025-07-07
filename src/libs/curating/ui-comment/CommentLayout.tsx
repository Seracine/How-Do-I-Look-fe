import classNames from 'classnames/bind'
import styles from './CommentLayout.module.scss'
import { CommentType } from '@services/types'

const cx = classNames.bind(styles)

type CommentLayoutProps = {
  comment: CommentType
  optionButtons: React.ReactNode
}

const CommentLayout = ({ comment, optionButtons }: CommentLayoutProps) => {
  const { nickname, content } = comment
  return (
    <div className={cx('container')}>
      <h5 className={cx('nickname')}>
        {nickname}<span className={cx('author')}>작성자</span>
      </h5>
      <p className={cx('content')}>{content}</p>
      <div className={cx('buttonsWrapper')}>
        {optionButtons}
      </div>
    </div>
  )
}

export default CommentLayout
