import * as fs from 'fs'
import * as path from 'path'

const root = fs.realpathSync(process.cwd())
const resolveApp = (to) => path.resolve(root, to)

const docz = resolveApp('.docz')
const temp = path.resolve(docz, 'storybook/')

const storybookConfigDir = resolveApp('.storybook')

const storybook = {
  configDir: storybookConfigDir,
  config: 'config.js'
}

export default {
  root,
  resolveApp,
  docz,
  temp,
  storybook
}
