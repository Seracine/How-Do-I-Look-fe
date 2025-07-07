import { uploadImage as uploadImageApi } from '@services/api'

const SIZE_LIMIT_MB = 5
const BYTES_IN_MEGABYTES = 1024 * 1024
const BASE_URL = process.env.NEXT_PUBLIC_API_URL

const uploadImage = async (file: File) => {
  if (file.size > SIZE_LIMIT_MB * BYTES_IN_MEGABYTES) {
    alert(`파일 사이즈가 너무 큽니다. 5MB 이하의 파일을 업로드해주세요.\n파일명: ${file.name}`)
    return
  }

  try {
    const { imageUrl } = await uploadImageApi(file)
    return `${BASE_URL}${imageUrl}`
  } catch (error) {
    alert('파일 업로드에 실패했습니다. 다시 시도해주세요.')
  }
}

export default uploadImage
