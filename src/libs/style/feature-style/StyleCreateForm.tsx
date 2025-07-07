'use client'

import { StyleFormInput } from '@services/types'
import StyleForm from './StyleForm'
import useConfirmModal from '@libs/shared/modal/useConfirmModal'
import { useRouter } from 'next/navigation'
import postStyle from '../data-access-style/postStyle'

type StyleCreateFormProps = {

}

const StyleCreateForm = ({ }: StyleCreateFormProps) => {
  const { renderConfirmModal, openConfirmModal } = useConfirmModal()
  const router = useRouter()

  const handleCreateStyle = async (data: StyleFormInput) => {
    try {
      await postStyle(data)
      openConfirmModal({
        description: '스타일 등록이 완료되었습니다.',
        onClose: () => {
          router.push('/')
        },
      })
    } catch (error) {
      openConfirmModal({
        description: '스타일 등록에 실패했습니다.',
      })
    }
  }

  return (
    <>
      <StyleForm onSubmit={handleCreateStyle} />
      {renderConfirmModal()}
    </>
  )
}

export default StyleCreateForm
