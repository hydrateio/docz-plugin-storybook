const { storybook } = require('docz-plugin-storybook')
const { createPlugin } = require('docz-core')

module.exports = {
  indexHtml: null,
  wrapper: undefined,
  plugins: [storybook(createPlugin)]
}
