import { createPlugin } from 'docz-core'
import path from 'path'

export const storybook = () => createPlugin({
  modifyBundlerConfig: (config, dev) => {
    config.resolve = config.resolve || { }
    config.resolve.alias = config.resolve.alias || { }
    config.resolve.alias['@storybook/react'] = path.resolve(__dirname, './storybook-react-client-shim')
  }
})
