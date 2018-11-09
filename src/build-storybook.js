const build = require('@storybook/react/standalone')
const detect = require('detect-port')
const handler = require('serve-handler')
const http = require('http')
const puppeteer = require('puppeteer')
const readPkgUp = require('read-pkg-up')
const tempy = require('tempy')

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

  const server = http.createServer((request, response) => {
    return handler(request, response, {
      public: outputDir
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
  const storybook = await page.evaluate(() => {
    const globalHook = '__DOCZ_PLUGIN_STORYBOOK_CLIENT_API__'

    // TODO: if this hook doesn't exist, user needs to upgrade @storybook/react
    return window[globalHook].getStorybook()
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
