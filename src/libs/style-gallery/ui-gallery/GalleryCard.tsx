import classNames from 'classnames/bind'
import styles from './GalleryCard.module.scss'
import { GalleryStyle } from '@services/types'
import Image from 'next/image'
import Icon from '../../shared/icon/Icon'
import Link from 'next/link'
import { STYLE_CATEGORY_TITLE_MAP } from '../../shared/util-constants/constants'

const cx = classNames.bind(styles)

type GalleryCardProps = {
  card: GalleryStyle
}

const GalleryCard = ({ card }: GalleryCardProps) => {

  const { id, thumbnail, tags, title, content, nickname, viewCount: viewsCount, curationCount: curationsCount, categories } = card
  const isCategoryEllipsis = Object.keys(categories).length > 4

  return (
    <div className={cx('container')}>
      <Link href={`/styles/${id}`} className={cx('imageContainer', { isCategoryEllipsis })}>
        <Image
          src={thumbnail}
          alt="갤러리 카드 이미지"
          width={340}
          height={480}
          className={cx('image')}
          priority
        />
        <div className={cx('categories')}>
          {Object.entries(categories).map(([key, category], idx) => {
            if (idx > 3) return
            return (
              <div key={key} className={cx('category')}>
                <div className={cx('categoryNameContainer')}>
                  <Icon name='arrow' width={8} height={8} alt='카테고리 제목 글머리' />
                  <h4>{STYLE_CATEGORY_TITLE_MAP[key]}</h4>
                </div>
                <p className={cx('categoryInfo')}>{`${category.name}, ${category.brand}, ${category.price.toLocaleString()}원`}</p>
              </div>
            )
          })}
          {isCategoryEllipsis && (
            <div className={cx('categoryNameContainer')}>
              <Icon name='arrow' width={8} height={8} alt='카테고리 제목 글머리' />
              <span>...</span>
            </div>
          )}
        </div>
        {isCategoryEllipsis && (
          <div className={cx('moreInfo')}>
            <div>스타일 더보기</div>
            <Icon name='see-more-arrow' width={16} height={16} alt='스타일 더보기 화살표' />
          </div>
        )}
      </Link>
      <div className={cx('body')}>
        <div className={cx('titleContainer')}>
          <div className={cx('tagsContainer')}>
            {tags.map((tag) => {
              return (
                <span key={tag}>{`#${tag}`}</span>
              )
            })}
          </div>
          <h2 className={cx('title')}>
            <Link href={`/styles/${id}`}>{title}</Link>
          </h2>
          <h3 className={cx('nickname')}>{nickname}</h3>
        </div>
        <p className={cx('content')}>{content}</p>
      </div>
      <div className={cx('footer')}>
        <div className={cx('count')}>
          <Icon name='eye' height={16} width={16} alt='조회수 아이콘' />
          <span>{viewsCount}</span>
        </div>
        <div className={cx('count')}>
          <Icon name='chat' height={16} width={16} alt='큐레이팅수 아이콘' />
          <span>{curationsCount}</span>
        </div>
      </div>
    </div>
  )
}

export default GalleryCard
