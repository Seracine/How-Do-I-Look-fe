'use server'

import { putCurating as putCuratingApi } from '@services/api'
import { CuratingFormInput } from '@services/types'
import { revalidatePath, revalidateTag } from 'next/cache'

const putCurating = async (curationId: number, body: CuratingFormInput) => {
  const response = await putCuratingApi(curationId, body)

  revalidateTag('curatings')
  revalidatePath('/')
  revalidatePath('/ranking')

  return response
}

export default putCurating
