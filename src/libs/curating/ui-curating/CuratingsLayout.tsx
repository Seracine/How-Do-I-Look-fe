import classNames from 'classnames/bind'
import styles from './CuratingsLayout.module.scss'

const cx = classNames.bind(styles)

type CuratingsLayoutProps = {
  postCuratingButton: React.ReactNode
  searchBar: React.ReactNode
  contents: React.ReactNode
}

const CuratingsLayout = ({ postCuratingButton, searchBar, contents }: CuratingsLayoutProps) => {
  return (
    <div className={cx('container')} id='curating'>
      <div className={cx('title')}>큐레이팅</div>
      <div className={cx('buttonWrapper')}>{postCuratingButton}</div>
      <div className={cx('searchBarWrapper')}>{searchBar}</div>
      {contents}
    </div>
  )
}

export default CuratingsLayout
