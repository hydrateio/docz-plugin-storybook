import * as fs from 'fs'
import * as path from 'path'

export const root = fs.realpathSync(process.cwd())
export const resolveApp = (to) => path.resolve(root, to)

export const docz = resolveApp('.docz')
export const temp = path.resolve(docz, 'storybook/')

const storybookRoot = resolveApp('.storybook')

export const storybook = {
  root: storybookRoot,
  config: path.resolve(storybookRoot, 'config.js')
}
