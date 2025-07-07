import { CategoryKey } from '@services/types'

export const STYLE_CATEGORY_TITLE_MAP: Record<string, string> = {
  [CategoryKey.top]: '상의',
  [CategoryKey.bottom]: '하의',
  [CategoryKey.shoes]: '신발',
  [CategoryKey.dress]: '원피스',
  [CategoryKey.accessory]: '패션잡화',
  [CategoryKey.outer]: '아우터',
  [CategoryKey.bag]: '가방',
}

export const PASSWORD_VALIDATION_REGEXP = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,16}$/
export const URL_VALIDATION_REGEXP = /^(https?:\/\/)/
