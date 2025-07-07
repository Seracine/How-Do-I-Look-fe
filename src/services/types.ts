// 공통
export type PaginationResponse<T> = {
  currentPage: number,
  totalPages: number,
  totalItemCount: number
  data: T[],
}

export type CategoryValue = {
  [CategoryValueField.name]: string
  [CategoryValueField.brand]: string
  [CategoryValueField.price]: number
}

// Enum
export enum SortBy {
  latest = 'latest',
  mostViewed = 'mostViewed',
  mostCurated = 'mostCurated',
}

export enum SearchByStyle {
  nickname = 'nickname',
  title = 'title',
  content = 'content',
  tag = 'tag'
}

export enum SearchByCurating {
  nickname = 'nickname',
  content = 'content',
}

export enum RankBy {
  total = 'total',
  trendy = 'trendy',
  personality = 'personality',
  practicality = 'practicality',
  costEffectiveness = 'costEffectiveness',
}

export enum CategoryKey {
  top = 'top',
  bottom = 'bottom',
  outer = 'outer',
  dress = 'dress',
  shoes = 'shoes',
  bag = 'bag',
  accessory = 'accessory',
}

export enum CategoryValueField {
  name = 'name',
  brand = 'brand',
  price = 'price',
}

// SearchParams
export type GalleryStylesSearchParams = {
  sortBy: SortBy
  searchBy: SearchByStyle
  keyword: string
  tag: string
  page?: number
}

export type RankingStylesSearchParams = {
  rankBy: RankBy
  page: number
}

export type CuratingsSearchParams = {
  page: number
  searchBy: SearchByCurating
  keyword: string
}

// style - data
export type GalleryStyle = {
  id: number
  thumbnail: string
  tags: string[]
  title: string
  content: string
  nickname: string
  viewCount: number
  curationCount: number
  categories: {
    [key in CategoryKey]?: CategoryValue
  }
}

export type Ranking = {
  ranking: number
  rating: number
}

export type RankingStyle = Omit<GalleryStyle, 'content'> & Ranking

export type StyleDetail = {
  imageUrls: string[]
} & Omit<GalleryStyle, 'thumbnail'>

// style - input
export type StyleFormInput = {
  imageUrls: string[]
  tags: string[]
  title: string
  nickname: string
  content: string
  categories: {
    [key in CategoryKey]?: CategoryValue
  }
  password: string
}

export type StyleDeleteFormInput = Pick<StyleFormInput, 'password'>

// curation - data
export type CuratingType = {
  id: number
  nickname: string
  content: string
  trendy: number
  personality: number
  practicality: number
  costEffectiveness: number
  comment: CommentType | {}
}

export type CommentType = {
  id: number
  nickname: string
  content: string
}

// curation - input
export type CuratingFormInput = {
  nickname: string
  content: string
  trendy: number
  personality: number
  practicality: number
  costEffectiveness: number
  password: string
}

export type CuratingDeleteFormInput = Pick<CuratingFormInput, 'password'>

export type CommentFormInput = {
  content: string
  password: string
}

export type CommentDeleteFormInput = Pick<CommentFormInput, 'password'>

// baseUrl - input
export type BaseUrlSettingFormInput = {
  baseUrl: string
}
