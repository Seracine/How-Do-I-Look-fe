import classNames from 'classnames/bind'
import styles from './RankingCard.module.scss'
import { RankingStyle } from '@services/types'
import Image from 'next/image'
import Link from 'next/link'
import Icon from '../../shared/icon/Icon'
import { STYLE_CATEGORY_TITLE_MAP } from '../../shared/util-constants/constants'

const cx = classNames.bind(styles)

type RankingCardProps = {
  card: RankingStyle
}

const RankingCard = ({ card }: RankingCardProps) => {
  const { id, thumbnail, tags, title, nickname, viewCount: viewsCount, curationCount: curationsCount, categories, ranking, rating } = card
  const isCategoryEllipsis = Object.keys(categories).length > 2

  return (
    <div className={cx('container')}>
      <Link href={`/styles/${id}`} className={cx('imageWrapper')}>
        <Image
          src={thumbnail}
          alt="랭킹 카드 이미지"
          width={255}
          height={360}
          className={cx('image')}
          priority
        />
      </Link>
      <div className={cx('info')}>
        <div className={cx('header')}>
          <div className={cx('rankContainer')}>
            <span className={cx('rank')}>{ranking}</span>
            <span className={cx('point')}>{`${rating.toFixed(1)}점`}</span>
          </div>
          <div className={cx('titleContainer')}>
            <h2 className={cx('title')}>
              <Link href={`/styles/${id}`}>
                {title}
              </Link>
            </h2>
            <h3 className={cx('nickname')}>{nickname}</h3>
            <div className={cx('tags')}>
              {tags.map((tag) => {
                return (
                  <span key={tag} className={cx('tag')}>{`#${tag}`}</span>
                )
              })}
            </div>
          </div>
        </div>
        <div className={cx('categories')}>
          {Object.entries(categories).map(([key, category], idx) => {
            if (idx > 1) return
            return (
              <div key={key} className={cx('category')}>
                <div className={cx('categoryNameContainer')}>
                  <div className={cx('iconWrapper')}>
                    <Icon name='arrow' width={8} height={8} alt='카테고리 제목 글머리' />
                  </div>
                  <h4>{STYLE_CATEGORY_TITLE_MAP[key]}</h4>
                </div>
                <p className={cx('categoryInfo')}>{`${category.name}, ${category.brand}, ${category.price.toLocaleString()}원`}</p>
              </div>
            )
          })}
          {isCategoryEllipsis && (
            <div className={cx('categoryNameContainer', { isCategoryEllipsis })}>
              <div className={cx('iconWrapper')}>
                <Icon name='arrow' width={8} height={8} alt='카테고리 제목 글머리' />
              </div>
              <span>...</span>
            </div>
          )}
        </div>
        <div className={cx('footer')}>
          <div className={cx('countContainer')}>
            <div className={cx('count')}>
              <Icon name='eye' height={16} width={16} alt='조회수 아이콘' />
              <span>{viewsCount}</span>
            </div>
            <div className={cx('count')}>
              <Icon name='chat' height={16} width={16} alt='큐레이팅수 아이콘' />
              <span>{curationsCount}</span>
            </div>
          </div>
          {isCategoryEllipsis && (
            <Link href={`/styles/${id}`} className={cx('moreInfo')}>
              <div>스타일 더보기</div>
              <Icon name='see-more-arrow' width={16} height={16} alt='스타일 더보기 화살표' />
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}

export default RankingCard
