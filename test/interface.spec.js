import { storybook } from '../src'
import path from 'path'

test('docz-storybook-plugin interface', () => {
  const plugin = storybook()
  expect(typeof plugin.modifyBundlerConfig).toBe('function')

  const config = {
    entry: {}
  }
  plugin.modifyBundlerConfig(config, true)

  expect(config).toEqual({
    entry: {
      app: [path.resolve(__dirname, '..', '.storybook', 'config.js')]
    },
    resolve: {
      alias: {
        '@storybook/react': path.resolve(__dirname, '..', 'src', './shim'),
        'docz-plugin-storybook/story-wrapper': path.resolve(__dirname, '..', 'src', './default-wrapper.js')
      }
    }
  })
})
