'use client'

import classNames from 'classnames/bind'
import styles from './CuratingForm.module.scss'
import { CuratingFormInput } from '@services/types'
import { FormProvider, useForm } from 'react-hook-form'
import Button from '@libs/shared/button/Button'
import FieldLabel from '@libs/shared/input/FieldLabel/FieldLabel'
import TextAreaConnect from '@libs/shared/form-field/TextAreaConnect'
import RangeSliderConnect from '@libs/shared/form-field/RangeSliderConnect'
import TextFieldConnect from '@libs/shared/form-field/TextFieldConnect'
import { PASSWORD_VALIDATION_REGEXP } from '@libs/shared/util-constants/constants'

const cx = classNames.bind(styles)

type CuratingFormProps = {
  defaultValues?: Omit<CuratingFormInput, 'password'>
  onSubmit: (data: CuratingFormInput) => void
}

const CuratingForm = ({ defaultValues, onSubmit }: CuratingFormProps) => {
  const methods = useForm<CuratingFormInput>({ defaultValues, mode: 'onChange' })
  const { handleSubmit, formState, reset } = methods
  return (
    <FormProvider {...methods}>
      <form
        className={cx('container')}
        onSubmit={async (e) => {
          await handleSubmit(onSubmit)(e)
          if (!defaultValues) reset()
        }}
      >
        <div className={cx('trendy')}>
          <FieldLabel label='트렌디' marginBottom='0' />
          <RangeSliderConnect
            name='trendy'
            defaultValue={5}
          />
        </div>
        <div className={cx('personality')}>
          <FieldLabel label='개성' marginBottom='0' />
          <RangeSliderConnect
            name='personality'
            defaultValue={5}
          />
        </div>
        <div className={cx('practicality')}>
          <FieldLabel label='실용성' marginBottom='0' />
          <RangeSliderConnect
            name='practicality'
            defaultValue={5}
          />
        </div>
        <div className={cx('costEffectiveness')}>
          <FieldLabel label='가성비' marginBottom='0' />
          <RangeSliderConnect
            name='costEffectiveness'
            defaultValue={5}
          />
        </div>
        <div className={cx('content')}>
          <FieldLabel label='한줄 큐레이팅' />
          <TextAreaConnect
            name='content'
            placeholder='큐레이팅 내용을 작성해 주세요'
            rules={{
              required: '필수 입력사항입니다.',
              maxLength: { value: 150, message: '150자 이내로 입력해 주세요' },
            }}
          />
        </div>
        <div className={cx('nickname')}>
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
        <div className={cx('password')}>
          <FieldLabel label='비밀번호' />
          <TextFieldConnect
            name='password'
            type='password'
            placeholder={
              defaultValues
                ? '큐레이팅 등록시 작성했던 비밀번호를 입력해 주세요'
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
          <Button
            type='submit'
            size='large'
            disabled={!formState.isValid}
          >{`큐레이팅 ${defaultValues ? '수정' : '참여'}하기`}
          </Button>
        </div>
      </form>
    </FormProvider>
  )
}

export default CuratingForm
