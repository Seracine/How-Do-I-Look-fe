'use client'

import FormModal from '@libs/shared/modal/form-modal/FormModal'
import useModal from '@libs/shared/modal/useModal'
import CommentForm from './CommentForm'
import { CommentFormInput } from '@services/types'
import useConfirmModal from '@libs/shared/modal/useConfirmModal'
import postComment from '../data-access-comment/postComment'

type CommentCreateButtonProps = {
  curatingId: number
}

const CommentCreateButton = ({ curatingId }: CommentCreateButtonProps) => {
  const { closeModal, modalRef, openModal } = useModal()
  const { renderConfirmModal, openConfirmModal } = useConfirmModal()

  const handleCreateComment = async (data: CommentFormInput) => {
    try {
      await postComment(curatingId, data)
      closeModal()
      openConfirmModal({
        description: '답글 등록이 완료되었습니다.',
      })
    } catch (error) {
      openConfirmModal({
        description: '답글 등록에 실패했습니다.',
      })
    }
  }
  return (
    <>
      <button onClick={() => { openModal() }}><span>답글 달기</span></button>
      <FormModal
        ref={modalRef}
        onClose={closeModal}
        title='답글'
        content={(
          <CommentForm
            onSubmit={handleCreateComment}
          />
        )}
      />
      {renderConfirmModal()}
    </>
  )
}

export default CommentCreateButton
