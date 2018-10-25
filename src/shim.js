import ClientAPI from './client-api'

const clientAPI = new ClientAPI()

// mock the minimal set of exports from `@storybook/react`
export const storiesOf = clientAPI.storiesOf
export const setAddon = clientAPI.setAddon
export const addDecorator = clientAPI.addDecorator
export const addParameters = clientAPI.addParameters
export const clearDecorators = clientAPI.clearDecorators
export const getStorybook = clientAPI.getStorybook

// these deal with hot reloading and ensuring that story state and the react i
// dom are properly updated which isn't really necessary for our use case, so
// we export empty stubs for the sake of compatibility.
export const configure = () => { } // TODO: noop
export const forceReRender = () => { } // TODO: noop
