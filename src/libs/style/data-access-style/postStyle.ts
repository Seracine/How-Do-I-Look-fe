'use server'

import { postStyle as postStyleApi } from '@services/api'
import { CategoryKey, CategoryValue, StyleFormInput } from '@services/types'
import { revalidatePath } from 'next/cache'

const postStyle = async (data: StyleFormInput) => {
  const { categories, ...rest } = data

  let filteredCategories: {
    [key in CategoryKey]?: CategoryValue
  } = {}
  Object.entries(categories).forEach(([key, value]) => {
    if (Object.values(value).some(Boolean))
      filteredCategories[key as CategoryKey] = value
  })
  const body = {
    ...rest,
    categories: filteredCategories,
  }

  const styleDetail = await postStyleApi(body)

  revalidatePath('/')
  revalidatePath('/ranking')

  return styleDetail
}

export default postStyle
