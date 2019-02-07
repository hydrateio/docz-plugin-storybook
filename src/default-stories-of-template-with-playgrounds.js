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

  return `<div>&lt;Playground&gt;
  &lt;${component.importName} ${propString} /&gt;
&lt;Playground&gt;</div>
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

export default ({ kind, stories, component }) => {
  return `
---
routable: false
---

import { Story } from 'docz-plugin-storybook/dist/react'
import { Playground } from 'docz'
${renderComponentImports(component)}

${stories.map(({ name }) => `## ${name}

<Story kind="${kind}" name="${name}" />

${renderComponentPlayground(component)}
`).join('\n')}
`
}
