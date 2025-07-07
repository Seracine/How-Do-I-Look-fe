'use client'

import classNames from 'classnames/bind'
import styles from './SearchBar.module.scss'
import { Controller, useForm } from 'react-hook-form'
import TextField from '../TextField/TextField'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import Dropdown from '@libs/shared/dropdown/Dropdown'
import useUpdateQueryURL from '@libs/shared/util-hook/useUpdateQueryURL'
import { SearchByCurating, SearchByStyle } from '@services/types'

const cx = classNames.bind(styles)

type SearchBarProps = {
  initialSearchBy: SearchByStyle | SearchByCurating
  initialKeyword: string
  inputWidth?: string
  searchByFilters: {
    data: SearchByStyle | SearchByCurating
    text: string
  }[]
  hasPageParmas?: boolean
}

const SearchBar = ({ initialSearchBy, initialKeyword, inputWidth = '340px', searchByFilters, hasPageParmas = false }: SearchBarProps) => {
  const { control, handleSubmit } = useForm<{ keywordValue: string }>()
  const [searchByValue, setSearchByValue] = useState(initialSearchBy)
  const router = useRouter()
  const { updateQueryURL } = useUpdateQueryURL()

  const handleSearch = ({ keywordValue }: { keywordValue: string }) => {
    const updates: Record<string, string | number> = {
      'searchBy': searchByValue,
      'keyword': keywordValue,
    }
    if (hasPageParmas) {
      updates['page'] = 1
    }

    router.push(
      updateQueryURL(updates),
      { scroll: false },
    )
  }

  return (
    <form
      className={cx('container')}
      onSubmit={((e) => { handleSubmit(handleSearch)(e) })}
    >
      <div className={cx('dropdownWrapper')}>
        <Dropdown
          currentData={searchByValue}
          filters={searchByFilters}
          onSelect={(data) => { setSearchByValue(data) }}
        />
      </div>
      <div className={cx('inputWrapper')}>
        <Controller
          control={control}
          name='keywordValue'
          defaultValue={initialKeyword}
          render={({ field }) => (
            <TextField {...field} width={inputWidth} placeholder='검색어 입력 후 Enter' />
          )}
        />
      </div>
    </form>
  )
}

export default SearchBar
