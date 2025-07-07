import { CommentDeleteFormInput } from '@services/types'
import { FormProvider, useForm } from 'react-hook-form'
import AuthFormContent from '@libs/shared/form-field/AuthFormContent/AuthFormContent'

type CommentDeleteFormProps = {
  onSubmit: (data: CommentDeleteFormInput) => void
  onClose: () => void
}

const CommentDeleteForm = ({ onSubmit, onClose }: CommentDeleteFormProps) => {
  const methods = useForm<CommentDeleteFormInput>()
  const { handleSubmit, formState } = methods
  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <AuthFormContent
          onClose={onClose}
          placeholder='스타일 등록시 작성했던 비밀번호를 입력해 주세요'
          disabled={!formState.isValid}
        />
      </form>
    </FormProvider>
  )
}

export default CommentDeleteForm
