import classNames from 'classnames/bind'
import styles from './MainLayout.module.scss'

const cx = classNames.bind(styles)

type MainLayoutProps = {
  title: string
  children: React.ReactNode
  titleMarginBottom?: string
  paddingInline?: string
}

const MainLayout = ({ title, children, titleMarginBottom = '100px', paddingInline = '220px' }: MainLayoutProps) => {
  return (
    <main className={cx('container')} style={{ paddingInline }}>
      <h1 className={cx('title')} style={{ marginBottom: titleMarginBottom }}>{title}</h1>
      <div className={cx('content')}>{children}</div>
    </main>
  )
}

export default MainLayout
