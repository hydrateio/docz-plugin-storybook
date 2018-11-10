import { createPlugin } from 'docz-core'
import * as path from 'path'
import fs from 'fs-extra'
import koaStatic from 'koa-static'
import semver from 'semver'
import slugify from '@sindresorhus/slugify'

// import buildStorybook from './build-storybook'
import findPkgUpDep from './find-pkg-up-dep'
import paths from './paths'

const minStorybookSemver = '>=3'
const v3StorybookSemver = '^3'
const v4StorybookSemver = '^4'

export const storybook = (opts = { }) => {
  const {
    // these options are intended to mimic the storybook cli options
    configDir = paths.storybook.configDir,
    staticDir,
    storyWrapper = './default-wrapper',
    autofill = false,
    debug = false,
    stories
  } = opts

  const storybookVersion = findPkgUpDep('@storybook/react')
  if (!storybookVersion) {
    console.error('[docz-plugin-storybook] "@storybook/react" is a required peer dependency. Aborting.')
    process.exit(1)
  }

  if (!semver.satisfies(storybookVersion, minStorybookSemver)) {
    console.error(`[docz-plugin-storybook] "@storybook/react" unsupported version v${storybookVersion}. Requires "${minStorybookSemver}". Aborting.`)
    process.exit(1)
  }

  const isStorybookV3 = semver.satisfies(storybookVersion, v3StorybookSemver)
  const isStorybookV4 = semver.satisfies(storybookVersion, v4StorybookSemver)

  if (isStorybookV3 === isStorybookV4) {
    console.error(`[docz-plugin-storybook] "@storybook/react" unsupported version v${storybookVersion}. Aborting.`)
    process.exit(1)
  }

  console.log({ storybookVersion, isStorybookV3, isStorybookV4 })

  const storybookConfigPath = path.resolve(configDir, paths.storybook.config)
  const storybookFiles = []

  return createPlugin({
    // TODO: making setConfig synchronous for now so we don't rely on our docz PR
    setConfig: (config) => {
      if (autofill) {
        console.error(`Error: docz-plugin-storybook autofill is currently unsupported`)
        process.exit(1)
      }

      const storybook = stories
      // ? await buildStorybook({ configDir, staticDir })
      // : stories

      if (storybook && storybook.length) {
        if (debug) {
          console.log('storybook', JSON.stringify(storybook, null, 2))
        }

        fs.ensureDirSync(paths.temp)
        storybook.forEach((storyKind) => {
          const { kind, stories } = storyKind
          const kindSlug = slugify(kind)
          const routes = kind.split('/').map((p) => p.trim())

          let kindTitle = kind
          let menu = null

          if (routes.length > 1) {
            kindTitle = routes.slice(1).join(' - ')
            menu = routes[0]
          }

          // TODO: support " characters in kind and name
          const content = `
---
name: ${kindTitle}
${menu ? `menu: ${menu}` : ''}
---

import { Story } from 'docz-plugin-storybook/dist/react'

# ${kind}

${stories.map(({ name }) => `
## ${name}

<Story kind="${kind}" name="${name}" />
`).join('\n')}
`
          const file = path.join(paths.temp, `${kindSlug}-storybook.mdx`)
          storybookFiles.push(file)
          return fs.writeFileSync(file, content)
        })
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

      // TODO: replace this with an alias of `storybook-readme` in the future
      const mdxRule = config.module.rules
        .find((rule) => rule.use && rule.use[0] && rule.use[0].loader && rule.use[0].loader.endsWith('?id=mdx'))

      if (mdxRule) {
        // don't process markdown files as mdx because it conflicts with the
        // storybook-readme addon that uses its own markdown => html loaders
        mdxRule.test = /\.(markdown|mdx)$/
      }

      config.module.rules.push({
        test: /\.md$/,
        use: [
          {
            loader: 'html-loader'
          },
          {
            loader: 'markdown-loader'
          }
        ]
      })

      if (fs.existsSync(webpackConfigPath)) {
        const customizeConfig = require(webpackConfigPath)
        config = customizeConfig(config, process.env.NODE_ENV)
      }

      config.module.rules = config.module.rules
        .filter((rule) => !rule.loader || !/json-loader/.test(rule.loader))

      if (debug) {
        console.log('-'.repeat(80))
        console.log('webpack', JSON.stringify(config, null, 2))
        console.log('-'.repeat(80))
      }

      return config
    },

    onCreateApp: (app) => {
      if (staticDir) {
        const staticPath = path.resolve(staticDir)

        if (!fs.existsSync(staticPath)) {
          console.error(`Error: no such directory to load static files: ${staticPath}`)
          process.exit(1)
        }

        app.use(koaStatic(staticPath))
      }
    }
  })
}
