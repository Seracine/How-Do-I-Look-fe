import classNames from 'classnames/bind'
import styles from './CommentForm.module.scss'
import { CommentFormInput } from '@services/types'
import { FormProvider, useForm } from 'react-hook-form'
import TextAreaConnect from '@libs/shared/form-field/TextAreaConnect'
import FieldLabel from '@libs/shared/input/FieldLabel/FieldLabel'
import TextFieldConnect from '@libs/shared/form-field/TextFieldConnect'
import Button from '@libs/shared/button/Button'
import { PASSWORD_VALIDATION_REGEXP } from '@libs/shared/util-constants/constants'

const cx = classNames.bind(styles)

type CommentFormProps = {
  defaultValues?: Omit<CommentFormInput, 'password'>
  onSubmit: (data: CommentFormInput) => void
  onClose?: () => void
}

const CommentForm = ({ defaultValues, onSubmit, onClose }: CommentFormProps) => {
  const methods = useForm<CommentFormInput>({ defaultValues, mode: 'onChange' })
  const { handleSubmit, formState, reset } = methods
  return (
    <FormProvider {...methods}>
      <form onSubmit={async (e) => {
        await handleSubmit(onSubmit)(e)
        if (!defaultValues) reset()
      }}
      >
        <div className={cx('content')}>
          <TextAreaConnect
            name='content'
            placeholder='답글을 입력해 주세요'
            rules={{
              required: '필수 입력사항입니다.',
              maxLength: { value: 150, message: '150자 이내로 입력해 주세요' },
            }}
          />
        </div>
        <div className={cx('password')}>
          <FieldLabel label='비밀번호 입력' />
          <TextFieldConnect
            name='password'
            type='password'
            placeholder='스타일 등록시 작성했던 비밀번호를 입력해 주세요'
            rules={{
              required: '필수 입력사항입니다.',
              pattern: {
                value: PASSWORD_VALIDATION_REGEXP,
                message: '영문, 숫자 조합 8~16자리로 입력해주세요',
              },
            }}
          />
        </div>
        <div className={cx('buttonWrapper')}>
          {defaultValues && (
            <Button color='bright' type='button' onClick={onClose}>취소하기</Button>
          )}
          <Button type='submit' disabled={!formState.isValid}>{defaultValues ? '수정하기' : '등록하기'}</Button>
        </div>
      </form>
    </FormProvider>
  )
}

export default CommentForm
