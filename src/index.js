import { createPlugin } from 'docz-core'
import * as path from 'path'
import fs from 'fs-extra'
import koaStatic from 'koa-static'
import slugify from '@sindresorhus/slugify'
import paths from './paths'
import buildStorybook from './build-storybook'

export const storybook = (opts = { }) => {
  const {
    // these options are intended to mimic the storybook cli options
    configDir = paths.storybook.configDir,
    staticDir,
    storyWrapper = './default-wrapper',
    autofill = false,
    stories
  } = opts

  const storybookConfigPath = path.resolve(configDir, paths.storybook.config)
  const storybookFiles = []

  return createPlugin({
    setConfig: async (config) => {
      const storybook = autofill
        ? await buildStorybook({ configDir })
        : stories

      if (storybook && storybook.length) {
        // console.log('storybook', JSON.stringify(storybook, null, 2))

        await fs.ensureDir(paths.temp)
        await Promise.all(storybook.map((storyKind) => {
          const { kind, stories } = storyKind
          const kindSlug = slugify(kind)

          // TODO: support " characters in kind and name
          const content = `
---
name: ${kind} Stories
---

import { Story } from 'docz-plugin-storybook/dist/react'

# ${kind}

${stories.map(({ name }) => `
## ${name}

<Story kind="${kind}" name="${name}" />

`).join('\n\n')}
`
          const file = path.join(paths.temp, `${kindSlug}-storybook.mdx`)
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
    },

    onCreateApp: (app) => {
      console.log('onCreateApp', app)

      if (staticDir) {
        const staticPath = path.resolve(staticDir)

        if (!fs.existsSync(staticPath)) {
          console.error(`Error: no such directory to load static files: ${staticPath}`)
          process.exit(-1)
        }

        app.use(koaStatic(staticPath))
      }
    }
  })
}
