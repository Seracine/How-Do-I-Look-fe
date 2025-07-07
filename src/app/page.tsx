import classNames from 'classnames/bind'
import styles from './page.module.scss'
import MainLayout from '@libs/shared/layout/MainLayout'
import SearchBar from '@libs/shared/input/SearchBar/SearchBar'
import StyleSort from '@libs/style-gallery/feature-gallery/StyleSort'
import Button from '@libs/shared/button/Button'
import Link from 'next/link'
import GalleryStyleList from '@libs/style-gallery/feature-gallery/GalleryStyleList'
import TagList from '@libs/style-gallery/feature-gallery/TagList'
import { SortBy, SearchByStyle } from '@services/types'
import { SEARCH_BY_STYLE_FILTERS } from '@libs/shared/dropdown/constants'
import { META_HOME } from '@app/_meta'
import getGalleryStyles from '@libs/style-gallery/data-access-gallery/getGalleryStyles'

const cx = classNames.bind(styles)

type HomePageProps = {
  searchParams: Partial<{
    sortBy: string
    searchBy: string
    keyword: string
    tag: string
  }>
}

const HomePage = async ({ searchParams }: HomePageProps) => {
  const {
    sortBy: sortByParam,
    searchBy: searchByParam,
    keyword = '',
    tag = '',
  } = searchParams
  const sortBy = SortBy[sortByParam as keyof typeof SortBy] || SortBy.latest
  const searchBy = SearchByStyle[searchByParam as keyof typeof SearchByStyle] || SearchByStyle.nickname

  const { data, currentPage, totalPages } = await getGalleryStyles({ sortBy, searchBy, keyword, tag })

  return (
    <MainLayout title='갤러리'>
      <div className={cx('headerTop')}>
        <SearchBar
          initialSearchBy={searchBy}
          initialKeyword={keyword}
          searchByFilters={SEARCH_BY_STYLE_FILTERS}
        />
        <Link href="/styles/create">
          <Button>스타일 등록하기</Button>
        </Link>
      </div>
      <div className={cx('headerBottom')}>
        <TagList />
        <StyleSort currentSortBy={sortBy} />
      </div>
      <GalleryStyleList
        searchParams={{ sortBy, searchBy, keyword, tag, page: 1 }}
        initialStyles={data}
        initialHasNext={currentPage < totalPages}
      />
    </MainLayout>
  )
}

export const revalidate = 0
export const metadata = META_HOME
export default HomePage
