import { createPlugin } from 'docz-core'
import * as path from 'path'
import fs from 'fs-extra'
import paths from './paths'
import buildStorybook from './build-storybook'

export const storybook = (opts = { }) => {
  const {
    // these options are intended to mimic the storybook cli options
    configDir = paths.storybook.configDir,
    storyWrapper,
    manual = false
  } = opts

  const storybookConfigPath = path.resolve(configDir, paths.storybook.config)
  const storybookFiles = []

  return createPlugin({
    setConfigPromise: async (config) => {
      if (!manual) {
        const storybook = await buildStorybook({ configDir })
        console.log('storybook', JSON.stringify(storybook, null, 2))

        await fs.ensureDir(paths.temp)
        await Promise.all(storybook.map((storyKind) => {
          const { kind, stories } = storyKind

          const content = `
---
name: ${kind} Stories
---

import { Story } from 'docz-plugin-storybook/dist/react'

# ${kind}

${stories.map(({ name }) => `
## ${name}

<Story kind='${kind}' name='${name}' />

`)}
`
          const file = path.join(paths.temp, `${kind}-storybook.mdx`)
          storybookFiles.push(file)
          return fs.writeFile(file, content)
        }))
      }

      // config.files = ensureArray(config.files).concat([
      //   path.join(paths.temp, '*.mdx')
      // ])

      console.log('docz config')
      console.log('-'.repeat(80))
      console.log(JSON.stringify(config, null, 2))
      console.log()
      console.log()

      return config
    },

    modifyFiles: (files) => {
      return files.concat(storybookFiles)
    },

    modifyBundlerConfig: (config, dev, args) => {
      config.entry = config.entry || {}
      config.entry.app = config.entry.app || []
      config.entry.app.push(storybookConfigPath)

      config.resolve = config.resolve || {}
      config.resolve.alias = config.resolve.alias || {}
      config.resolve.alias['@storybook/react'] = path.resolve(__dirname, './shim')

      // create a wrapper around each component for isolation and surface it as docz-plugin-storybook/story-wrapper
      config.resolve.alias['docz-plugin-storybook/story-wrapper'] = require.resolve(storyWrapper || './default-wrapper')

      console.log('webpack')
      console.log('-'.repeat(80))
      console.log(JSON.stringify(config, null, 2))
      console.log()
      console.log()

      return config
    }
  })
}
