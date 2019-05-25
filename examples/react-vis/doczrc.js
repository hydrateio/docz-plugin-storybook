const { storybook } = require('docz-plugin-storybook')
const { createPlugin } = require('docz-core')
const stories = require('./stories.json')

module.exports = {
  wrapper: undefined,
  indexHtml: null,
  plugins: [
    storybook(createPlugin, { stories })
  ]
}
