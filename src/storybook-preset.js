const path = require('path')

exports.webpackFinal = function (config) {
  config.resolve = config.resolve || {}
  config.resolve.alias = config.resolve.alias || {}
  config.resolve.alias['@storybook/react'] = path.resolve(__dirname, 'shim.js')

  // TODO: this shouldn't be necessary but may be better than minifying?
  config.mode = 'development'

  // skip all the manager entries
  delete config.entry.manager

  console.log('storybook webpack')
  console.log('-'.repeat(80))
  console.log(JSON.stringify(config, null, 2))
  console.log()
  console.log()

  return config
}
