import renderer from 'react-test-renderer'
import { getStorybook } from '../src/shim'

describe('Storybook Shim', () => {
  describe('against Basic Fixture', () => {
    let ButtonStory, story1, story2

    beforeAll(() => {
      require('./fixtures/basic')
      const storyBook = getStorybook()
      ButtonStory = storyBook[0]
      story1 = ButtonStory.stories[0]
      story2 = ButtonStory.stories[1]
    })

    it('should transform the storybook to an object', () => {
      expect(ButtonStory.kind).toBe('Button')
      expect(Array.isArray(ButtonStory.stories)).toBe(true)
      expect(ButtonStory.stories.length).toBe(2)
      expect(story1.name).toBe('with text')
      expect(story2.name).toBe('with some emoji')
    })

    it('should match story snapshots', () => {
      const Story1 = renderer.create(story1.render()).toJSON()
      const Story2 = renderer.create(story2.render()).toJSON()

      expect(Story1).toMatchSnapshot()
      expect(Story2).toMatchSnapshot()
    })
  })
})
