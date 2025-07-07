import { CommentType } from '@services/types'
import CommentLayout from '../ui-comment/CommentLayout'
import CommentOptionButtons from './CommentOptionButtons'

type CommentProps = {
  comment: CommentType
}

const Comment = ({ comment }: CommentProps) => {
  return (
    <CommentLayout
      comment={comment}
      optionButtons={<CommentOptionButtons comment={comment} />}
    />
  )
}

export default Comment
