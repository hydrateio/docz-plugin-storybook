import build from '@storybook/react/standalone'
import detect from 'detect-port'
import handler from 'serve-handler'
import http from 'http'
import pRetry from 'p-retry'
import puppeteer from 'puppeteer'
import readPkgUp from 'read-pkg-up'
import tempy from 'tempy'
import path from 'path'
import fs from 'fs'

module.exports = async (opts = { }) => {
  // build storybook standalone with custom webpack config
  // -----------------------------------------------------

  const { pkg } = await readPkgUp()
  const outputDir = tempy.directory()

  await build({
    mode: 'static',
    packageJson: pkg,
    configDir: './.storybook',
    outputDir,
    port: 60001,
    host: 'localhost',
    ...opts,
    frameworkPresets: [
      require.resolve('./storybook-preset.js'),
      ...(opts.frameworkPresets || [])
    ]
  })

  // console.log('storybook webpack success', outputDir)

  // serve static bundle
  // -------------------

  const doesSbFilesExistInTempDir = fs.existsSync(path.join(outputDir, 'index.html'))

  const publicPath = doesSbFilesExistInTempDir ? outputDir : path.join(process.cwd(), outputDir)

  const server = http.createServer((request, response) => {
    return handler(request, response, {
      public: publicPath
    })
  })

  const port = await detect(49402)
  const baseUrl = `http://localhost:${port}`
  await new Promise((resolve, reject) => {
    server.listen(port, () => {
      resolve()
    })
  })

  // launch headless chrome and capture bundle's storybook
  // -----------------------------------------------------

  const browser = await puppeteer.launch()
  const page = await browser.newPage()

  await page.goto(`${baseUrl}/iframe.html`)

  const storybook = await pRetry(() => {
    return page.evaluate(() => {
      const globalHook = '__DOCZ_PLUGIN_STORYBOOK_CLIENT_API__'

      return window[globalHook].getStorybook()
    })
  }, {
    onFailedAttempt: error => {
      console.log(`Attempt to retrieve storybook info #${error.attemptNumber} failed. There are ${error.retriesLeft} retries left.`)
    },
    retries: 10
  })

  await Promise.all([
    browser.close(),
    new Promise((resolve, reject) => {
      server.close((err) => {
        if (err) reject(err)
        else resolve()
      })
    })
  ])

  return storybook
}
