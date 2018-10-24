import { test } from 'ava'
import { storybook } from '../src'
import path from 'path'

test('docz-storybook-plugin interface', async (t) => {
  const plugin = storybook()
  t.is(typeof plugin.modifyBundlerConfig, 'function')

  const config = { }
  plugin.modifyBundlerConfig(config, true)
  t.deepEqual(config, {
    resolve: {
      alias: {
        path.resolve(__dirname, '..', 'src', './storybook-react-client-shim')
      }
    }
  })
})
