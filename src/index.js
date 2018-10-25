import { createPlugin } from 'docz-core'
import ensureArray from 'ensure-array'
import fs from 'fs'
import path from 'path'
import paths from './paths'

export const storybook = (opts = { }) => {
  /*
  const {
    // TODO: plugin config options
  } = opts
  */

  return createPlugin({
    setConfig: (config) => {
      const testMDX = path.join(paths.temp, 'test.mdx')
      fs.writeFileSync(testMDX, `
import '${paths.storybook.config}'
`)

      config.files = ensureArray(config.files).concat([
        path.join(paths.temp, '*.mdx')
      ])
    },

    modifyBundlerConfig: (config, dev) => {
      config.resolve = config.resolve || { }
      config.resolve.alias = config.resolve.alias || { }
      config.resolve.alias['@storybook/react'] = path.resolve(__dirname, './shim')
    }
  })
}
