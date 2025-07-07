import { getStyle as getStyleDetailApi } from '@services/api'

const getStyleDetail = async (styleId: number) => {
  const response = await getStyleDetailApi(styleId)
  return response
}

export default getStyleDetail
