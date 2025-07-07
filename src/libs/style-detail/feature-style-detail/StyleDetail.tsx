import getStyleDetail from '../data-access-style-detail/getStyleDetail'
import StyleDetailLayout from '../ui-style-detail/StyleDetailLayout'
import StyleImageCarousel from '../ui-style-detail/StyleImageCarousel'
import StyleOptionButtons from './StyleOptionButtons'

type StyleDetailProps = {
  styleId: number
}

const StyleDetail = async ({ styleId }: StyleDetailProps) => {
  const styleDetail = await getStyleDetail(styleId)
  const { imageUrls, ...styleDetailContent } = styleDetail

  return (
    <StyleDetailLayout
      styleDetailContent={styleDetailContent}
      styleImageCarousel={<StyleImageCarousel imageUrls={imageUrls} />}
      optionButtons={<StyleOptionButtons styleId={styleId} />}
    />
  )
}

export default StyleDetail
