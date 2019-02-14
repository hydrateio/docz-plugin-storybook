const { storybook } = require('docz-plugin-storybook')
const { createPlugin } = require('docz-core')

module.exports = {
  wrapper: undefined,
  indexHtml: null,
  plugins: [
    storybook(createPlugin)
  ]
}
