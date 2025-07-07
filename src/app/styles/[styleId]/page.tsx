import classNames from 'classnames/bind'
import styles from './page.module.scss'
import { SearchByCurating } from '@services/types'
import StyleDetail from '@libs/style-detail/feature-style-detail/StyleDetail'
import Divider from '@libs/shared/layout/Divider'
import Curatings from '@libs/curating/feature-curating/Curatings'
import convertPageParamToNumber from '@libs/shared/util-util/convertPageParamToNumber'
import convertStyleIdParamToNumber from '@libs/shared/util-util/convertStyleIdParamToNumber'
import { META_STYLE_DETAIL } from '@app/_meta'

const cx = classNames.bind(styles)

type StyleDetailPageProps = {
  params: { styleId: string }
  searchParams: Partial<{
    searchBy: string
    keyword: string
    page: string
  }>
}

const StyleDetailPage = ({ params, searchParams }: StyleDetailPageProps) => {
  const {
    searchBy: searchByParam,
    keyword = '',
    page: pageParam,
  } = searchParams

  const searchBy = SearchByCurating[searchByParam as keyof typeof SearchByCurating] || SearchByCurating.nickname
  const page = convertPageParamToNumber(pageParam)

  const { styleId: styleIdParam } = params
  const styleId = convertStyleIdParamToNumber(styleIdParam)

  return (
    <main className={cx('container')}>
      <StyleDetail styleId={styleId} />
      <Divider marginBlock='100px' color='gray' />
      <Curatings styleId={styleId} searchParams={{ searchBy, keyword, page }} />
    </main>
  )
}

export const revalidate = 60
export const metadata = META_STYLE_DETAIL
export default StyleDetailPage
