import { createPlugin } from 'docz-core'
import ensureArray from 'ensure-array'
import path from 'path'
import paths from './paths'

export const storybook = (opts = { }) => {
  const {
    configDir = paths.storybook.configDir
  } = opts

  const storybookConfigPath = path.rseolve(configDir, paths.config)

  return createPlugin({
    setConfig: (config) => {
      // TODO: since we're only given an entrypoint .storybook/config.js with a configure
      // call to load stories on the client, we won't know which mdx files to create so
      // we may have to inject entries dynamically on the client as part of the 'configure'
      // process. after configure, we add all story kinds to the client-side entries?

      // TODO: docz will only transpile files from src/* so our temp mdx needs to exist
      // somewhere in the source tree (not temp), possibly in .docz/storybook
      // const testMDX = path.join(paths.temp, 'test.mdx')
      // fs.writeFileSync(testMDX, `import '${paths.storybook.config}'`)

      // config.files = ensureArray(config.files).concat([
      //   path.join(paths.temp, '*.mdx')
      // ])

      console.log(JSON.stringify(config, null, 2))
      config.entry = [
        storybookConfigPath
      ].concat(ensureArray(config.entry))
    },

    modifyBundlerConfig: (config, dev) => {
      config.resolve = config.resolve || { }
      config.resolve.alias = config.resolve.alias || { }
      config.resolve.alias['@storybook/react'] = path.resolve(__dirname, './shim')
    }
  })
}
