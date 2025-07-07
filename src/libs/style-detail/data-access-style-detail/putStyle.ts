'use server'

import { putStyle as putStyleApi } from '@services/api'
import { CategoryKey, CategoryValue, StyleFormInput } from '@services/types'
import { revalidatePath } from 'next/cache'

const putStyle = async (styleId: number, data: StyleFormInput) => {
  const { categories, ...rest } = data

  let filteredCategories: {
    [key in CategoryKey]?: CategoryValue
  } = {}
  Object.entries(categories).forEach(([key, value]) => {
    if (Object.values(value).some(Boolean)) filteredCategories[key as CategoryKey] = value
  })
  const body = {
    ...rest,
    categories: filteredCategories,
  }

  const response = await putStyleApi(styleId, body)
  revalidatePath(`/styles/${styleId}`)
  revalidatePath(`/styles/${styleId}/edit`)
  revalidatePath('/')
  revalidatePath('/ranking')

  return response
}

export default putStyle
