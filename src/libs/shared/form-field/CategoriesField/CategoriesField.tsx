import classNames from 'classnames/bind'
import styles from './CategoriesField.module.scss'
import { Controller, useFormContext } from 'react-hook-form'
import { CategoryKey, StyleFormInput } from '@services/types'
import FieldLabel from '@libs/shared/input/FieldLabel/FieldLabel'
import Hint from '@libs/shared/input/Hint/Hint'
import CategoryField from './CategoryField'

const cx = classNames.bind(styles)

type CategoriesFieldProps = {
}

const CategoriesField = ({ }: CategoriesFieldProps) => {
  const { control } = useFormContext<StyleFormInput>()

  return (
    <div className={cx('container')}>
      <FieldLabel label='스타일 구성' />
      <Controller
        control={control}
        name="categories"
        rules={{
          validate: (categoryValues) => {
            return Object.values(categoryValues).some((categoryValue) => {
              return !!categoryValue?.name
            })
              || '최소 하나 이상 선택해주세요.'
          },
        }}
        render={({ fieldState: { error } }) => (
          <>
            <div className={cx('categoryContainer')}>
              <CategoryField categoryName={CategoryKey.top} />
              <CategoryField categoryName={CategoryKey.bottom} />
              <CategoryField categoryName={CategoryKey.outer} />
              <CategoryField categoryName={CategoryKey.dress} />
              <CategoryField categoryName={CategoryKey.shoes} />
              <CategoryField categoryName={CategoryKey.bag} />
              <CategoryField categoryName={CategoryKey.accessory} />
            </div>
            {error?.message && <Hint message={error.message} />}
          </>
        )}
      />
    </div>
  )
}

export default CategoriesField
