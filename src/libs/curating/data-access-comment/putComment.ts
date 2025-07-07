'use server'

import { putComment as putCommentApi } from '@services/api'
import { CommentFormInput } from '@services/types'
import { revalidateTag } from 'next/cache'

const putComment = async (commentId: number, body: CommentFormInput) => {
  const response = await putCommentApi(commentId, body)

  revalidateTag('curatings')

  return response
}

export default putComment
