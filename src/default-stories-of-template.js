export default ({ kind, stories, component, defaultPlaygroundProps }) => {
  return `
---
routable: false
---

import { Story } from 'docz-plugin-storybook/dist/react'

${stories.map(({ name }) => `## ${name}

<Story kind="${kind}" name="${name}" />
`).join('\n')}
`
}
