import ClientAPI from './client-api'
import './channel'

// TODO: possibly remove this from shim
// import './channel'

const globalHook = '__DOCZ_PLUGIN_STORYBOOK_CLIENT_API__'
const clientAPI = window[globalHook] || new ClientAPI()
window[globalHook] = clientAPI

// mock the minimal set of exports from `@storybook/react`
export const storiesOf = clientAPI.storiesOf
export const setAddon = clientAPI.setAddon
export const addDecorator = clientAPI.addDecorator
export const addParameters = clientAPI.addParameters
export const clearDecorators = clientAPI.clearDecorators
export const getStorybook = clientAPI.getStorybook

export const forceReRender = () => { } // TODO: noop

export const configure = (loaders, module) => {
  console.log('configuring storybook', loaders)
  if (loaders) {
    // load all stories into the client API via one or more imperative commonjs
    // 'require' trees
    loaders()
  }
}

// additional, private exports
export const _clientAPI = clientAPI
