const path = require('path')

exports.webpackFinal = function (config) {
  config.resolve = config.resolve || {}
  config.resolve.alias = config.resolve.alias || {}
  config.resolve.alias['@storybook/react'] = path.resolve(__dirname, 'shim')

  // TODO: this shouldn't be necessary but may be better than minifying?
  config.mode = 'development'

  // skip all the manager entries
  delete config.entry.manager

  return config
}
