export default ({ kind, stories, component, kindSlug }) => {
  return {
    fileNameSuffix: '',
    template: `
import { Story } from 'docz-plugin-storybook/dist/react'

${stories.map(({ name }) => `## ${name}

<Story kind="${kind}" name="${name}" />
`).join('\n')}
`
  }
}
