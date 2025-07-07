'use client'

import OptionButtonsLayout from '@libs/shared/layout/OptionButtonsLayout'
import FormModal from '@libs/shared/modal/form-modal/FormModal'
import useModal from '@libs/shared/modal/useModal'
import { CuratingDeleteFormInput, CuratingFormInput, CuratingType } from '@services/types'
import CuratingForm from './CuratingForm'
import CuratingDeleteForm from './CuratingDeleteForm'
import useConfirmModal from '@libs/shared/modal/useConfirmModal'
import putCurating from '../data-access-curating/putCurating'
import deleteCurating from '../data-access-curating/deleteCurating'
import { useRouter } from 'next/navigation'
import useUpdateQueryURL from '@libs/shared/util-hook/useUpdateQueryURL'

type CuratingOptionButtonsProps = {
  curating: CuratingType
}

const CuratingOptionButtons = ({ curating }: CuratingOptionButtonsProps) => {
  const curatingEditFormModal = useModal()
  const curatingDeleteFormModal = useModal()
  const { renderConfirmModal, openConfirmModal } = useConfirmModal()

  const router = useRouter()
  const { updateQueryURL } = useUpdateQueryURL()

  const handleEditCurating = async (data: CuratingFormInput) => {
    try {
      await putCurating(curating.id, data)
      curatingEditFormModal.closeModal()
      openConfirmModal({
        description: '큐레이팅 수정이 완료되었습니다.',
      })
    } catch (error) {
      openConfirmModal({
        description: '큐레이팅 수정에 실패했습니다.',
      })
    }
  }

  const handleDeleteCurating = async (data: CuratingDeleteFormInput) => {
    try {
      await deleteCurating(curating.id, data)
      router.push(updateQueryURL({ page: 1 }), { scroll: false })
      curatingDeleteFormModal.closeModal()
      openConfirmModal({
        description: '큐레이팅 삭제가 완료되었습니다.',
      })
    } catch (error) {
      openConfirmModal({
        description: '큐레이팅 삭제에 실패했습니다.',
      })
    }
  }

  return (
    <>
      <OptionButtonsLayout
        onClickEdit={() => { curatingEditFormModal.openModal() }}
        onClickDelete={() => { curatingDeleteFormModal.openModal() }}
      />
      <FormModal
        ref={curatingEditFormModal.modalRef}
        onClose={curatingEditFormModal.closeModal}
        title='큐레이팅'
        content={(
          <CuratingForm
            onSubmit={handleEditCurating}
            defaultValues={{
              trendy: curating.trendy,
              personality: curating.personality,
              practicality: curating.practicality,
              costEffectiveness: curating.costEffectiveness,
              content: curating.content,
              nickname: curating.nickname,
            }}
          />
        )}
      />
      <FormModal
        ref={curatingDeleteFormModal.modalRef}
        onClose={curatingDeleteFormModal.closeModal}
        title='삭제 권한 인증'
        content={(
          <CuratingDeleteForm
            onSubmit={handleDeleteCurating}
            onClose={curatingDeleteFormModal.closeModal}
          />
        )}
      />
      {renderConfirmModal()}
    </>
  )
}

export default CuratingOptionButtons
