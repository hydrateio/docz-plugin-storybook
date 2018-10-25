import { storybook } from '../src'
import path from 'path'

test('docz-storybook-plugin interface', () => {
  const plugin = storybook()
  expect(typeof plugin.modifyBundlerConfig).toBe('function')

  const config = { }
  plugin.modifyBundlerConfig(config, true)

  expect(config).toEqual({
    resolve: {
      alias: {
        '@storybook/react': path.resolve(__dirname, '..', 'src', './storybook-react-client-shim')
      }
    }
  })
})
