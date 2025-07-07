import { CuratingDeleteFormInput, CuratingFormInput } from '@services/types'
import { FormProvider, useForm } from 'react-hook-form'
import AuthFormContent from '@libs/shared/form-field/AuthFormContent/AuthFormContent'

type CuratingDeleteFormProps = {
  onSubmit: (data: CuratingDeleteFormInput) => void
  onClose: () => void
}

const CuratingDeleteForm = ({ onSubmit, onClose }: CuratingDeleteFormProps) => {
  const methods = useForm<CuratingFormInput>()
  const { handleSubmit, formState } = methods
  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <AuthFormContent
          onClose={onClose}
          placeholder='큐레이팅 등록시 작성했던 비밀번호를 입력해 주세요'
          disabled={!formState.isValid}
        />
      </form>
    </FormProvider>
  )
}

export default CuratingDeleteForm
