export default ({ kind, stories }) => {
  const routes = kind.split('/').map((p) => p.trim())

  let kindTitle = kind
  let menu = null

  if (routes.length > 1) {
    kindTitle = routes.slice(1).join(' - ')
    menu = routes[0]
  }

  return `
---
name: ${kindTitle}
${menu ? `menu: ${menu}` : ''}
---

import { Story } from 'docz-plugin-storybook/dist/react'

# ${kind}

${stories.map(({ name }) => `
## ${name}

<Story kind="${kind}" name="${name}" />
`).join('\n')}
`
}
