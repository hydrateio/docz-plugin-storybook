import ClientAPI from './client-api'
import transformEntries from './transform-entries'

const g = global.window || global

export const globalHook = '__DOCZ_PLUGIN_STORYBOOK_CLIENT_API__'
export const globalTransformEntriesHook = '__DOCZ_PLUGIN_STORYBOOK_TRANSFORM_ENTRIES_HOOK__'

const clientAPI = g[globalHook] || new ClientAPI()
g[globalHook] = clientAPI
g[globalTransformEntriesHook] = transformEntries

// mock the minimal set of exports from `@storybook/react`
export const storiesOf = clientAPI.storiesOf
export const setAddon = clientAPI.setAddon
export const addDecorator = clientAPI.addDecorator
export const addParameters = clientAPI.addParameters
export const clearDecorators = clientAPI.clearDecorators
export const getStorybook = clientAPI.getStorybook

export const forceReRender = () => { } // TODO: noop

export const configure = (loaders, module) => {
  if (loaders) {
    // load all stories into the client API via one or more imperative commonjs
    // 'require' trees
    loaders()
  }
}

// additional, private exports
export const _clientAPI = clientAPI
