import getGalleryTags from '../data-access-gallery/getGalleryTags'
import UiTagList from '../ui-gallery/UiTagList'

type TagListProps = {
}

const TagList = async ({ }: TagListProps) => {
  const tags = await getGalleryTags()
  return (
    <UiTagList tags={tags} />
  )
}

export default TagList
