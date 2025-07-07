import { META_STYLE_CREATE } from '@app/_meta'
import MainLayout from '@libs/shared/layout/MainLayout'
import StyleCreateForm from '@libs/style/feature-style/StyleCreateForm'

type StyleCreatePageProps = {
}

const StyleCreatePage = ({ }: StyleCreatePageProps) => {

  return (
    <MainLayout title='스타일 등록' paddingInline='618.5px'>
      <StyleCreateForm />
    </MainLayout>
  )
}

export const metadata = META_STYLE_CREATE
export default StyleCreatePage
