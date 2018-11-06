const { storybook } = require('docz-plugin-storybook')

module.exports = {
  plugins: [
    storybook({
      storyWrapper: require.resolve('./story-wrapper')
    })
  ]
}
