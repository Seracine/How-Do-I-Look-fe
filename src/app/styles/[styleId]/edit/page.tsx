import convertStyleIdParamToNumber from '@libs/shared/util-util/convertStyleIdParamToNumber'
import { META_STYLE_EDIT } from '@app/_meta'
import getStyleDetail from '@libs/style-detail/data-access-style-detail/getStyleDetail'
import MainLayout from '@libs/shared/layout/MainLayout'
import StyleEditForm from '@libs/style/feature-style/StyleEditForm'

type StyleEditPageProps = {
  params: { styleId: string }
}

const StyleEditPage = async ({ params }: StyleEditPageProps) => {

  const { styleId: styleIdParam } = params
  const styleId = convertStyleIdParamToNumber(styleIdParam)
  const styleDetail = await getStyleDetail(styleId)

  return (
    <MainLayout title='스타일 수정' paddingInline='618.5px'>
      <StyleEditForm styleDetail={styleDetail} />
    </MainLayout>
  )
}

export const revalidate = 600
export const metadata = META_STYLE_EDIT
export default StyleEditPage
