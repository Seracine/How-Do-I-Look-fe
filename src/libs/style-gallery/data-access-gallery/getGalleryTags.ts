'use server'

import { getGalleryTags as getGalleryTagsApi } from '@services/api'

const getGalleryTags = async () => {
  const { tags } = await getGalleryTagsApi()
  return tags as string[]
}

export default getGalleryTags
