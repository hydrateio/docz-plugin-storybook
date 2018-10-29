import { createPlugin } from 'docz-core'
import * as path from 'path'

import { globalTransformEntriesHook } from './shim'
import paths from './paths'

export const storybook = (opts = { }) => {
  const {
    // these options are intended to mimic the storybook cli options
    configDir = paths.storybook.configDir
  } = opts

  const storybookConfigPath = path.resolve(configDir, paths.storybook.config)

  return createPlugin({
    setConfig: (config) => {
      config.themeConfig.transformEntries = globalTransformEntriesHook
      config.themeConfig.mode = 'dark'

      /*
      config.files = ensureArray(config.files).concat([
        path.join(paths.temp, '*.mdx')
      ])
      */

      console.log('docz config')
      console.log('-'.repeat(80))
      console.log(JSON.stringify(config, null, 2))
      console.log()
      console.log()

      return config
    },

    modifyBundlerConfig: (config, dev) => {
      const { app } = config.entry
      config.entry.app = [ app[0], storybookConfigPath, app[1] ]

      config.resolve = config.resolve || {}
      config.resolve.alias = config.resolve.alias || {}
      config.resolve.alias['@storybook/react'] = path.resolve(__dirname, './shim')

      config.plugins[0].state.debug = true
      config.plugins[1].state.debug = true

      console.log('webpack')
      console.log('-'.repeat(80))
      console.log(JSON.stringify(config, null, 2))
      console.log()
      console.log()

      return config
    }
  })
}
