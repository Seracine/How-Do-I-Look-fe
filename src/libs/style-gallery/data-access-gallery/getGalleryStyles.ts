'use server'

import { getGalleryStyles as getGalleryStylesApi } from '@services/api'
import { GalleryStylesSearchParams } from '@services/types'

const getGalleryStyles = async ({
  sortBy,
  searchBy,
  keyword,
  tag,
  page = 1,
}: GalleryStylesSearchParams) => {
  const response = await getGalleryStylesApi({
    sortBy,
    searchBy,
    keyword,
    tag,
    page,
  })
  return response
}

export default getGalleryStyles
