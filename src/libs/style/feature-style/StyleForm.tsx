'use client'

import classNames from 'classnames/bind'
import styles from './StyleForm.module.scss'
import { StyleFormInput } from '@services/types'
import { FormProvider, useForm } from 'react-hook-form'
import FieldLabel from '@libs/shared/input/FieldLabel/FieldLabel'
import Button from '@libs/shared/button/Button'
import ImageUploadConnect from '../../shared/form-field/ImageUploadConnect/ImageUploadConnect'
import TagsFieldConnect from '../../shared/form-field/TagsFieldConnect'
import TextFieldConnect from '@libs/shared/form-field/TextFieldConnect'
import TextAreaConnect from '@libs/shared/form-field/TextAreaConnect'
import CategoriesField from '@libs/shared/form-field/CategoriesField/CategoriesField'
import { PASSWORD_VALIDATION_REGEXP } from '@libs/shared/util-constants/constants'

const cx = classNames.bind(styles)

type StyleFormProps = {
  defaultValues?: Omit<StyleFormInput, 'password'>
  onSubmit: (data: StyleFormInput) => void
}

const StyleForm = ({ defaultValues, onSubmit }: StyleFormProps) => {
  const methods = useForm<StyleFormInput>({ defaultValues: defaultValues ?? { imageUrls: [], tags: [] } })
  const { handleSubmit } = methods
  return (
    <FormProvider {...methods}>
      <form className={cx('container')} onSubmit={handleSubmit(onSubmit)}>
        <div>
          <ImageUploadConnect
            name='imageUrls'
            rules={{
              required: '필수 입력사항입니다.',
            }}
          />
        </div>
        <div>
          <FieldLabel label='태그' />
          <TagsFieldConnect
            name='tags'
          />
        </div>
        <div>
          <FieldLabel label='제목' />
          <TextFieldConnect
            name='title'
            placeholder='제목을 입력해 주세요'
            rules={{
              validate: value => value.trim() !== '' || '필수 입력사항입니다.',
              maxLength: { value: 30, message: '30자 이내로 입력해 주세요' },
            }}
          />
        </div>
        <div>
          <FieldLabel label='닉네임' />
          <TextFieldConnect
            name='nickname'
            placeholder='닉네임을 입력해 주세요'
            rules={{
              validate: value => value.trim() !== '' || '필수 입력사항입니다.',
              maxLength: { value: 20, message: '20자 이내로 입력해 주세요' },
            }}
          />
        </div>
        <div>
          <CategoriesField />
        </div>
        <div>
          <FieldLabel label='스타일 설명' />
          <TextAreaConnect
            name='content'
            placeholder='나만의 스타일을 설명해 주세요'
            rules={{
              required: '필수 입력사항입니다.',
              maxLength: { value: 500, message: '500자 이내로 입력해 주세요' },
            }}
          />
        </div>
        <div>
          <FieldLabel label='비밀번호' />
          <TextFieldConnect
            name='password'
            type='password'
            placeholder={
              defaultValues
                ? '스타일 등록시 작성했던 비밀번호를 입력해 주세요'
                : '비밀번호를 입력해주세요'
            }
            rules={{
              required: '필수 입력사항입니다.',
              pattern: {
                value: PASSWORD_VALIDATION_REGEXP,
                message: '영문, 숫자 조합 8~16자리로 입력해주세요',
              },
            }}
          />
        </div>
        <div className={cx('submitButton')}>
          <Button type='submit' size='large'>{`스타일 ${defaultValues ? '수정' : '등록'}하기`}</Button>
        </div>
      </form>
    </FormProvider>
  )
}

export default StyleForm
