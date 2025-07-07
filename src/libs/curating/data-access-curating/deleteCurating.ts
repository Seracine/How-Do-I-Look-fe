'use server'

import { deleteCurating as deleteCuratingApi } from '@services/api'
import { CuratingDeleteFormInput } from '@services/types'
import { revalidatePath, revalidateTag } from 'next/cache'

const deleteCurating = async (curationId: number, body: CuratingDeleteFormInput) => {
  const response = await deleteCuratingApi(curationId, body)

  revalidateTag('curatings')
  revalidatePath('/')
  revalidatePath('/ranking')

  return response
}

export default deleteCurating
