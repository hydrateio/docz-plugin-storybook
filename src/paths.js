import * as fs from 'fs'
import * as path from 'path'

export const root = fs.realpathSync(process.cwd())
export const resolveApp = (to) => path.resolve(root, to)

export const docz = resolveApp('.docz')
export const temp = path.resolve(docz, 'storybook/')

const storybookConfigDir = resolveApp('.storybook')

export const storybook = {
  configDir: storybookConfigDir,
  config: 'config.js'
}
