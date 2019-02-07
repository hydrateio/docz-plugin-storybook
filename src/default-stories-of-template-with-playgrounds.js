const renderComponentImports = (component) => {
  if (!component) return ''

  const imports = [
    { importName: component.importName, importPath: component.importPath },
    ...component.otherImports
  ]

  return imports.map(imp => `import ${imp.importName} from '${imp.importPath}'`).join('\n')
}

const renderUsageInstructionsImports = (stories) => {
  return stories
    .filter(story => story.usageInstructionsMdxPath !== null)
    .map(({ name, usageInstructionsMdxPath }) => `import ${stringify(name)} from '${usageInstructionsMdxPath}'`).join('\n')
}

const stringify = (name) => {
  const updatedName = name.replace(/[^A-Za-z]/g, '')

  return updatedName.charAt(0).toUpperCase() + updatedName.slice(1)
}

export default ({ kind, stories, component }) => {
  return `
---
routable: false
---

import { Story } from 'docz-plugin-storybook/dist/react'
${renderComponentImports(component)}
${renderUsageInstructionsImports(stories)}

${stories.map(({ name, usageInstructionsMdxPath }) => `## ${name}

<Story kind="${kind}" name="${name}" usageInstructions={${usageInstructionsMdxPath ? `${stringify(name)}` : null}} />
`).join('\n')}
`
}
