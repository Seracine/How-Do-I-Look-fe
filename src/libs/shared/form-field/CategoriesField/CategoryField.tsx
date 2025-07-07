import classNames from 'classnames/bind'
import styles from './CategoryField.module.scss'
import { Controller, PathValue, useFormContext } from 'react-hook-form'
import { CategoryKey, CategoryValueField, StyleFormInput } from '@services/types'
import { useState } from 'react'
import TextField from '@libs/shared/input/TextField/TextField'
import Icon from '@libs/shared/icon/Icon'
import { STYLE_CATEGORY_TITLE_MAP } from '@libs/shared/util-constants/constants'
import Hint from '@libs/shared/input/Hint/Hint'

const cx = classNames.bind(styles)

type CategoryField = {
  categoryName: CategoryKey
}

const CategoryField = ({ categoryName }: CategoryField) => {
  const { getValues, getFieldState } = useFormContext<StyleFormInput>()

  const [disabled, setDisabled] = useState(!!!getValues(`categories.${categoryName}`))

  const handleToggleDisabled = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    // 참고: disabled 상태가 되었다가 풀려도 기존 값이 유지됨
    setDisabled((prev) => !prev)
  }

  const errorMessage = Object.values(CategoryValueField)
    .map((fieldName) => getFieldState(`categories.${categoryName}.${fieldName}`)?.error?.message)
    .find(Boolean)

  return (
    <div className={cx('container')}>
      <div className={cx('toggleContainer')}>
        <button onClick={handleToggleDisabled} type='button'>
          <Icon name={disabled ? 'unchecked' : 'checked'} width={20} height={20} alt={`카테고리 인풋 ${disabled ? '비활성화' : '활성화'} 아이콘`} />
        </button>
        <div className={cx('label')}>{STYLE_CATEGORY_TITLE_MAP[categoryName]}</div>
      </div>
      <div>
        {/* TODO-1: 금액 다 지웠을 때 0이 남음 */}
        <div className={cx('inputsContainer')}>
          <Controller
            name={`categories.${categoryName}.${CategoryValueField.name}`}
            disabled={disabled}
            rules={{
              validate: value => value.trim() !== '' || '필수 입력사항입니다.',
              maxLength: { value: 30, message: '30자 이내로 입력해 주세요' },
            }}
            defaultValue={'' as PathValue<StyleFormInput, `categories.${CategoryKey}.${CategoryValueField.name}`>}
            render={({ field }) => (
              <TextField
                {...field}
                width='160px'
                placeholder='의상명'
              />
            )}
          />
          <Controller
            name={`categories.${categoryName}.${CategoryValueField.brand}`}
            disabled={disabled}
            rules={{
              validate: value => value.trim() !== '' || '필수 입력사항입니다.',
              maxLength: { value: 30, message: '30자 이내로 입력해 주세요' },
            }}
            defaultValue={'' as PathValue<StyleFormInput, `categories.${CategoryKey}.${CategoryValueField.brand}`>}
            render={({ field }) => (
              <TextField
                {...field}
                width='160px'
                placeholder='브랜드명'
              />
            )}
          />
          <Controller
            name={`categories.${categoryName}.${CategoryValueField.price}`}
            disabled={disabled}
            rules={{
              required: '필수 입력사항입니다.',
              max: { value: 1000000000, message: '10억원 이하로 입력해 주세요' },
            }}
            defaultValue={'' as PathValue<StyleFormInput, `categories.${CategoryKey}.${CategoryValueField.price}`>}
            render={({ field: { onChange, ...field } }) => (
              <TextField
                {...field}
                type='number'
                width='160px'
                placeholder='가격'
                onChange={(e) => onChange(e.target.value ? e.target.valueAsNumber : 0)}
              />
            )}
          />
        </div>
        {errorMessage && <Hint message={errorMessage} />}
      </div>
    </div>
  )
}

export default CategoryField
