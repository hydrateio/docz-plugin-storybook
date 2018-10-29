import { _clientAPI } from './shim'
import slugify from '@sindresorhus/slugify'

const createEntryFromStory = (story, order) => {
  const id = `story-${story.kind}-${story.name}`
  const slug = slugify(id)

  return {
    id,
    filepath: `${id}.mdx`,
    slug,
    route: `/${slug}`,
    name: story.name,
    order,
    menu: null,
    headings: []
  }
}

export default (entries) => {
  const storyEntries = { }
  let count = 0

  console.log('transformEntries', entries)

  _clientAPI.getStorybook().forEach(({ kind, stories }) => {
    stories.forEach(({ name }) => {
      const entry = createEntryFromStory({ kind, name }, count)
      storyEntries[entry.name] = entry
      ++count
    })
  })

  return {
    ...entries,
    ...storyEntries
  }
}
