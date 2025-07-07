import classNames from 'classnames/bind'
import styles from './GlobalNavigationBar.module.scss'
import Link from 'next/link'
import Icon from '@libs/shared/icon/Icon'

const cx = classNames.bind(styles)

type GlobalNavigationBarProps = {

}

const GlobalNavigationBar = ({ }: GlobalNavigationBarProps) => {
  return (
    <nav className={cx('container')}>
      <Link href='/' className={cx('logo')}>
        <Icon name='logo' width={200} height={22} alt='로고' priority={true} />
      </Link>
      <div className={cx('buttonContainer')}>
        <Link href='/'>갤러리</Link>
        <Link href='/ranking'>랭킹</Link>
      </div>
    </nav>
  )
}

export default GlobalNavigationBar
