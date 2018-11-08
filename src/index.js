import { createPlugin } from 'docz-core'
import * as path from 'path'
import fs from 'fs-extra'
import paths from './paths'
import buildStorybook from './build-storybook'

export const storybook = (opts = { }) => {
  const {
    // these options are intended to mimic the storybook cli options
    configDir = paths.storybook.configDir,
    storyWrapper = './default-wrapper',
    autofill = true
  } = opts

  const storybookConfigPath = path.resolve(configDir, paths.storybook.config)
  const storybookFiles = []

  return createPlugin({
    setConfig: async (config) => {
      if (autofill) {
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

      return config
    },

    modifyFiles: (files) => {
      return files.concat(storybookFiles)
    },

    modifyBundlerConfig: (config, dev, args) => {
      const addonsPath = path.join(configDir, 'addons.js')
      const webpackConfigPath = path.join(configDir, 'webpack.config.js')

      config.entry = config.entry || {}
      config.entry.app = config.entry.app || []

      if (fs.existsSync(addonsPath)) {
        config.entry.app.push(addonsPath)
      }

      config.entry.app.push(storybookConfigPath)

      config.resolve = config.resolve || {}
      config.resolve.alias = config.resolve.alias || {}
      config.resolve.alias['@storybook/react'] = path.resolve(__dirname, './shim')

      // create a wrapper around each component for isolation and surface it as docz-plugin-storybook/story-wrapper
      config.resolve.alias['docz-plugin-storybook/story-wrapper'] = require.resolve(storyWrapper)

      if (fs.existsSync(webpackConfigPath)) {
        const customizeConfig = require(webpackConfigPath)
        config = customizeConfig(config, process.env.NODE_ENV)
      }

      config.module.rules = config.module.rules
        .filter((rule) => !rule.loader || !/json-loader/.test(rule.loader))

      /*
      console.log('webpack')
      console.log('-'.repeat(80))
      console.log(JSON.stringify(config, null, 2))
      console.log()
      console.log()
      */

      return config
    }
  })
}
