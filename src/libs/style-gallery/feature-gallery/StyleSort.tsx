'use client'

import Dropdown from '@libs/shared/dropdown/Dropdown'
import { SORT_BY_FILTERS } from '@libs/shared/dropdown/constants'
import useUpdateQueryURL from '@libs/shared/util-hook/useUpdateQueryURL'
import { SortBy } from '@services/types'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

type StyleSortProps = {
  currentSortBy: SortBy
}

const StyleSort = ({ currentSortBy }: StyleSortProps) => {
  const router = useRouter()
  const { updateQueryURL } = useUpdateQueryURL()
  const [dropdownData, setDropdownData] = useState(currentSortBy)

  useEffect(() => {
    setDropdownData(currentSortBy)
  }, [currentSortBy])

  return (
    <Dropdown
      currentData={dropdownData}
      filters={SORT_BY_FILTERS}
      onSelect={(data) => {
        setDropdownData(data)
        router.push(
          updateQueryURL({
            'sortBy': data,
          }),
          { scroll: false },
        )
      }}
    />
  )
}

export default StyleSort
