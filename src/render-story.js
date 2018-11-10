import handlebars from 'handlebars'

const defaultSource = `---
name: {{kindTitle}}
{{#if menu}}
menu: {{menu}}
{{/if}}
fullpage: true
---

import { Story } from 'docz-plugin-storybook/dist/react'

# {{kindTitle}}

{{#each stories}}
## {{name}}

<Story kind="{{../kind}}" name="{{name}}" />
{{/each}}
`

export default (source = defaultSource) => {
  const template = handlebars.compile(source)

  return (data) => template(data)
}
