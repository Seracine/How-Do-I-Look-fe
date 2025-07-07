'use server'

import { postComment as postCommentApi } from '@services/api'
import { CommentFormInput } from '@services/types'
import { revalidateTag } from 'next/cache'

const postComment = async (curationId: number, body: CommentFormInput) => {
  const response = await postCommentApi(curationId, body)
  revalidateTag('curatings')
  return response
}

export default postComment
