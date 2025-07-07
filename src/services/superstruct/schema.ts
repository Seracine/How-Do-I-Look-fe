import { number, object, string, Describe, array, enums, partial, type, Struct } from 'superstruct'
import { CategoryKey, CategoryValue, CategoryValueField } from '../types'

// enum
export const CategoryKeySchema: Describe<CategoryKey> = enums(Object.values(CategoryKey))
export const CategoryValueFieldSchema: Describe<CategoryValueField> = enums(Object.values(CategoryValueField))

// 공통
export const CategoryValueSchema: Describe<CategoryValue> = object({
  [CategoryValueField.name]: string(),
  [CategoryValueField.brand]: string(),
  [CategoryValueField.price]: number(),
})

export const generatePaginationSchema = <T extends Struct<any, any>>(dataSchema: T) => object({
  currentPage: number(),
  totalPages: number(),
  totalItemCount: number(),
  data: array(dataSchema),
})

// style - data
export const GalleryStyleSchema = type({
  id: number(),
  thumbnail: string(),
  tags: array(string()),
  title: string(),
  content: string(),
  nickname: string(),
  viewCount: number(),
  curationCount: number(),
  categories: partial(
    object({
      [CategoryKey.top]: CategoryValueSchema,
      [CategoryKey.bottom]: CategoryValueSchema,
      [CategoryKey.outer]: CategoryValueSchema,
      [CategoryKey.dress]: CategoryValueSchema,
      [CategoryKey.shoes]: CategoryValueSchema,
      [CategoryKey.bag]: CategoryValueSchema,
      [CategoryKey.accessory]: CategoryValueSchema,
    }),
  ),
})
