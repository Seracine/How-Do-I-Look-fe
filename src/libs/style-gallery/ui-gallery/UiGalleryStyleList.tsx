import classNames from 'classnames/bind'
import styles from './UiGalleryStyleList.module.scss'
import GalleryCard from '@libs/style-gallery/ui-gallery/GalleryCard'
import { GalleryStyle } from '@services/types'
import EmptyData from '@libs/shared/empty-data/EmptyData'

const cx = classNames.bind(styles)

type UiGalleryStyleListProps = {
  styles: GalleryStyle[]
}

const UiGalleryStyleList = ({ styles }: UiGalleryStyleListProps) => {

  if (styles.length === 0) return (
    <div className={cx('emptyStyleWrapper')}>
      <EmptyData text='아직 스타일이 없어요' />
    </div>
  )

  return (
    <div className={cx('container')}>
      {styles.map((style) => (
        <GalleryCard card={style} key={style.id} />
      ))}
    </div>

  )
}

export default UiGalleryStyleList
