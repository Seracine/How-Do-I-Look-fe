// src/libs/style-detail/feature-style-detail/StyleDetail.tsx

// 필요한 모듈 임포트
import getStyleDetail from '../data-access-style-detail/getStyleDetail'
import StyleDetailLayout from '../ui-style-detail/StyleDetailLayout'
import StyleImageCarousel from '../ui-style-detail/StyleImageCarousel'
import StyleOptionButtons from './StyleOptionButtons'
import { notFound } from 'next/navigation' // Next.js의 notFound 함수 임포트

type StyleDetailProps = {
  styleId: number
}

const StyleDetail = async ({ styleId }: StyleDetailProps) => {
  let styleDetail

  try {
    // getStyleDetail 함수가 API 호출 중 에러가 발생하면 여기서 catch 블록으로 이동합니다.
    styleDetail = await getStyleDetail(styleId)
  } catch (error) {
    // `console.error` 메시지의 큰따옴표를 작은따옴표로 변경했습니다.
    console.error(`[StyleDetail] 스타일 상세 정보 가져오기 실패 (ID: ${styleId}):`, error)

    // 에러가 Error 클래스의 인스턴스이고, 메시지에 '404'가 포함되어 있다면 (우리의 'API Error: 404' 에러)
    if (error instanceof Error && error.message.includes('404')) {
      // Next.js의 notFound() 함수를 호출하여 404 페이지를 렌더링하도록 합니다.
      notFound()
    }

    // 404 에러가 아니라면, 다른 예상치 못한 에러이므로 다시 던져서 Next.js의 전역 에러 처리(error.tsx)가 동작하도록 합니다.
    throw error
  }

  // styleDetail이 성공적으로 로드된 경우에만 아래 코드가 실행됩니다.
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
