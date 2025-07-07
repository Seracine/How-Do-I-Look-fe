'use server'

import { getCuratings as getCuratingsApi } from '@services/api'
import { CuratingsSearchParams } from '@services/types'

const getCuratings = async (styleId: number, { page, searchBy, keyword }: CuratingsSearchParams) => {
  const response = await getCuratingsApi(styleId, { page, searchBy, keyword })
  return response
}

export default getCuratings
