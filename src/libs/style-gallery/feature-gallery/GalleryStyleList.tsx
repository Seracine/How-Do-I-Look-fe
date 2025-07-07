'use client'

import { useEffect, useState } from 'react'
import UiGalleryStyleList from '../ui-gallery/UiGalleryStyleList'
import { GalleryStyle, GalleryStylesSearchParams } from '@services/types'
import getGalleryStyles from '../data-access-gallery/getGalleryStyles'
import useIntersect from '@libs/shared/util-hook/useIntersect'

type GalleryStyleListProps = {
  searchParams: GalleryStylesSearchParams
  initialStyles: GalleryStyle[]
  initialHasNext: boolean
}

const GalleryStyleList = ({ searchParams, initialStyles, initialHasNext }: GalleryStyleListProps) => {
  const [styles, setStyles] = useState(initialStyles)
  const [page, setPage] = useState(1)
  const [hasNext, setHasNext] = useState(initialHasNext)

  const loadMoreStyles = async () => {
    const newPage = page + 1
    const { data: newStyles, currentPage, totalPages } = await getGalleryStyles({ ...searchParams, page: newPage })

    setStyles((prevStyles) => [...prevStyles, ...newStyles])
    setPage(newPage)
    setHasNext(currentPage < totalPages)
  }
  const ref = useIntersect(() => { if (hasNext) loadMoreStyles() }, { rootMargin: '0px 0px 500px' })

  useEffect(() => {
    setStyles(initialStyles)
    setHasNext(initialHasNext)
    setPage(1)
  }, [initialStyles, initialHasNext])

  return (
    <>
      <UiGalleryStyleList styles={styles} />
      <div ref={ref} style={{ height: '1px' }} />
    </>
  )
}

export default GalleryStyleList
