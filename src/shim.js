import ClientAPI from './client-api'

const clientAPI = new ClientAPI()

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
    // TODO: is this setTimeout necessary?
    setTimeout(() => loaders())
  }
}

// additional, private exports
export const _clientAPI = clientAPI
