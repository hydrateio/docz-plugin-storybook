const defaultStorybookContentsRenderer = (kind) => '<StorybookContents />'

const defaultStorybookContentsImportsRenderer = (kindSlug) => `import StorybookContents from './${kindSlug}-storybook.mdx'`

export default ({ kind, stories, component, kindSlug, storybookContentsRenderer, storybookContentsImportsRenderer }) => {
  const routes = kind.split('/').map((p) => p.trim())

  let kindTitle = kind
  let menu = null

  if (routes.length > 1) {
    kindTitle = routes.slice(1).join(' - ')
    menu = routes[0]
  }

  const storybookRenderer = storybookContentsRenderer || defaultStorybookContentsRenderer
  const storybookImportsRenderer = storybookContentsImportsRenderer || defaultStorybookContentsImportsRenderer

  return `
---
name: ${kindTitle}
${menu ? `menu: ${menu}` : ''}
---

import { Playground } from 'docz'
${storybookImportsRenderer(kindSlug, component)}

# ${kind}

${storybookRenderer(kind, component)}
`
}
