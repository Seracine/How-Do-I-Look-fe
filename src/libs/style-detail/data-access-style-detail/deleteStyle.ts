import { deleteStyle as deleteStyleApi } from '@services/api'
import { StyleDeleteFormInput } from '@services/types'

const deleteStyle = async (styleId: number, body: StyleDeleteFormInput) => {
  const response = await deleteStyleApi(styleId, body)

  return response
}

export default deleteStyle
