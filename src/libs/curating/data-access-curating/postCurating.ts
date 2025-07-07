'use server'

import { postCurating as postCuratingApi } from '@services/api'
import { CuratingFormInput } from '@services/types'
import { revalidatePath } from 'next/cache'

const postCurating = async (styleId: number, body: CuratingFormInput) => {
  const response = await postCuratingApi(styleId, body)

  revalidatePath(`/styles/${styleId}`)
  revalidatePath('/')
  revalidatePath('/ranking')

  return response
}

export default postCurating
