'use client'

import Button from '@libs/shared/button/Button'
import FormModal from '@libs/shared/modal/form-modal/FormModal'
import useModal from '@libs/shared/modal/useModal'
import CuratingForm from './CuratingForm'
import { CuratingFormInput } from '@services/types'
import useConfirmModal from '@libs/shared/modal/useConfirmModal'
import postCurating from '../data-access-curating/postCurating'
import { useRouter } from 'next/navigation'
import useUpdateQueryURL from '@libs/shared/util-hook/useUpdateQueryURL'
import { CURATINGS_PAGE_SIZE } from '@libs/shared/pagination/constants'

type CuratingCreateButtonProps = {
  styleId: number
  totalItemCount: number
}

const CuratingCreateButton = ({ styleId, totalItemCount }: CuratingCreateButtonProps) => {
  const { closeModal, modalRef, openModal } = useModal()
  const { renderConfirmModal, openConfirmModal } = useConfirmModal()

  const router = useRouter()
  const { updateQueryURL } = useUpdateQueryURL()

  const handleCreateCurating = async (data: CuratingFormInput) => {
    try {
      await postCurating(styleId, data)
      router.push(updateQueryURL({ page: Math.ceil((totalItemCount + 1) / CURATINGS_PAGE_SIZE) }), { scroll: false })
      closeModal()
      openConfirmModal({
        description: '큐레이팅 등록이 완료되었습니다.',
      })
    } catch (error) {
      openConfirmModal({
        description: '큐레이팅 등록에 실패했습니다.',
      })
    }
  }

  return (
    <>
      <Button
        onClick={() => { openModal() }}
        type='button'
        size='large'
      >큐레이팅 참여하기
      </Button>
      <FormModal
        ref={modalRef}
        onClose={closeModal}
        title='큐레이팅'
        content={(
          <CuratingForm
            onSubmit={handleCreateCurating}
          />
        )}
      />
      {renderConfirmModal()}
    </>
  )
}

export default CuratingCreateButton
