const renderComponentPlayground = (component) => {
  if (!component) return ''

  const { children, ...defaultPlaygroundProps } = component.defaultPlaygroundProps || {}

  const propString = Object.keys(defaultPlaygroundProps).map(key => {
    return `${key}={${defaultPlaygroundProps[key]}}`
  }).join(' ')

  if (children) {
    return `<Playground>
  <${component.importName} ${propString}>
    ${children}
  </${component.importName}>
</Playground>
`
  }

  return `<Playground>
  <${component.importName} ${propString} />
</Playground>
`
}

const renderComponentImports = (component) => {
  if (!component) return ''

  const imports = [
    { importName: component.importName, importPath: component.importPath },
    ...component.otherImports
  ]

  return imports.map(imp => `import ${imp.importName} from '${imp.importPath}'`).join('\n')
}

export default ({ kind, stories, component, defaultPlaygroundProps }) => {
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
import { Playground } from 'docz'
${renderComponentImports(component)}

# ${kind}

${renderComponentPlayground(component, defaultPlaygroundProps)}

${stories.map(({ name }) => `
## ${name}

<Story kind="${kind}" name="${name}" />
`).join('\n')}
`
}
