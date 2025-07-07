'use client'

import { StyleDetail, StyleFormInput } from '@services/types'
import StyleForm from './StyleForm'
import useConfirmModal from '@libs/shared/modal/useConfirmModal'
import putStyle from '@libs/style-detail/data-access-style-detail/putStyle'
import { useRouter } from 'next/navigation'

type StyleEditFormProps = {
  styleDetail: StyleDetail
}

const StyleEditForm = ({ styleDetail }: StyleEditFormProps) => {
  const { renderConfirmModal, openConfirmModal } = useConfirmModal()
  const router = useRouter()

  const handleEditStyle = async (data: StyleFormInput) => {
    try {
      await putStyle(styleDetail.id, data)
      openConfirmModal({
        description: '스타일 수정이 완료되었습니다.',
        onClose: () => {
          router.push(`/styles/${styleDetail.id}`)
        },
      })
    } catch (error) {
      openConfirmModal({
        description: '스타일 수정에 실패했습니다.',
      })
    }
  }

  return (
    <>
      <StyleForm
        onSubmit={handleEditStyle}
        defaultValues={{
          imageUrls: styleDetail.imageUrls,
          tags: styleDetail.tags,
          title: styleDetail.title,
          nickname: styleDetail.nickname,
          content: styleDetail.content,
          categories: styleDetail.categories,
        }}
      />
      {renderConfirmModal()}
    </>
  )
}

export default StyleEditForm
