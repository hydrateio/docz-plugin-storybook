import { createPlugin } from 'docz-core'

export const myPlugin = () =>
  createPlugin({
    setConfig: config => {
      /* ... */
    },
    modifyBundlerConfig: (config, dev) => {
      /* ... */
    },
    modifyBabelRc: babelrc => {
      /* ... */
    },
    onCreateApp: app => {
      /* ... */
    },
    onServerListening: server => {
      /* ... */
    },
    onPreBuild: () => {
      /* ... */
    },
    onPostBuild: config => {
      /* ... */
    },
    onPreRender: config => {
      /* ... */
    },
    onPostRender: () => {
      /* ... */
    }
  })
