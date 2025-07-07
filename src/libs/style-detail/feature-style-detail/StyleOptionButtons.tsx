'use client'

import OptionButtonsLayout from '@libs/shared/layout/OptionButtonsLayout'
import FormModal from '@libs/shared/modal/form-modal/FormModal'
import useModal from '@libs/shared/modal/useModal'
import { useRouter } from 'next/navigation'
import StyleDeleteForm from './StyleDeleteForm'
import useConfirmModal from '@libs/shared/modal/useConfirmModal'
import deleteStyle from '../data-access-style-detail/deleteStyle'
import { StyleDeleteFormInput } from '@services/types'

type StyleOptionButtonsProps = {
  styleId: number
}

const StyleOptionButtons = ({ styleId }: StyleOptionButtonsProps) => {
  const styleDeleteFormModal = useModal()
  const { renderConfirmModal, openConfirmModal } = useConfirmModal()
  const router = useRouter()

  const handleEditStyle = () => {
    router.push(`/styles/${styleId}/edit`)
  }

  const handleDeleteStyle = async (data: StyleDeleteFormInput) => {
    try {
      await deleteStyle(styleId, data)
      openConfirmModal({
        description: '스타일 삭제가 완료되었습니다. 갤러리 페이지로 이동합니다.',
        onClose: () => {
          router.push('/')
          router.refresh()
        },
      })
      styleDeleteFormModal.closeModal()
    } catch (error) {
      openConfirmModal({
        description: '스타일 삭제에 실패했습니다.',
      })
    }
  }

  return (
    <>
      <OptionButtonsLayout
        onClickEdit={() => { handleEditStyle() }}
        onClickDelete={() => { styleDeleteFormModal.openModal() }}
      />
      <FormModal
        ref={styleDeleteFormModal.modalRef}
        onClose={styleDeleteFormModal.closeModal}
        title='삭제 권한 인증'
        content={(
          <StyleDeleteForm
            onSubmit={handleDeleteStyle}
            onClose={styleDeleteFormModal.closeModal}
          />
        )}
      />
      {renderConfirmModal()}
    </>
  )
}

export default StyleOptionButtons
