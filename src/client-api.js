import StoryStore from './story-store'

export default class ClientAPI {
  constructor({ storyStore = new StoryStore() } = {}) {
    this._storyStore = storyStore
    this._addons = {}
    this._globalParameters = {}
    this._globalDecorators = []
  }

  get store () {
    return this._storyStore
  }

  setAddon = (addon) => {
    this._addons = {
      ...this._addons,
      ...addon
    }
  }

  addDecorator = (decorator) => {
    this._globalDecorators.push(decorator)
  }

  addParameters = (parameters) => {
    this._globalParameters = parameters
  }

  clearDecorators = () => {
    this._globalDecorators = []
  }

  storiesOf = (kind, m) => {
    if (!kind && typeof kind !== 'string') {
      throw new Error('Invalid or missing kind provided for stories, should be a string')
    }

    if (!m) {
      console.warn(
        `Missing 'module' parameter for story with a kind of '${kind}'. It will break your HMR`
      )
    }

    if (m && m.hot && m.hot.dispose) {
      m.hot.dispose(() => {
        this._storyStore.removeStoryKind(kind)
        this._storyStore.incrementRevision()
      })
    }

    const localDecorators = []
    let localParameters = {}
    const api = {
      kind
    }

    // apply addons
    Object.keys(this._addons).forEach(name => {
      const addon = this._addons[name]
      api[name] = (...args) => {
        addon.apply(api, args)
        return api
      }
    })

    api.add = (storyName, getStory, parameters) => {
      if (typeof storyName !== 'string') {
        throw new Error(`Invalid or missing storyName provided for a "${kind}" story.`)
      }

      if (this._storyStore.hasStory(kind, storyName)) {
        console.warn(`Story of "${kind}" named "${storyName}" already exists`)
      }

      // Wrap the getStory function with each decorator. The first
      // decorator will wrap the story function. The second will
      // wrap the first decorator and so on.
      const decorators = [...localDecorators, ...this._globalDecorators]

      const fn = decorators.reduce(
        (decorated, decorator) => context => decorator(() => decorated(context), context),
        getStory
      )

      const fileName = m ? m.id : null

      const allParam = { fileName }

      const paramScopes = [
        this._globalParameters,
        localParameters,
        parameters
      ]

      paramScopes.forEach((params) => {
        if (params) {
          Object.keys(params).forEach(key => {
            if (Array.isArray(params[key])) {
              allParam[key] = params[key]
            } else if (typeof params[key] === 'object') {
              allParam[key] = { ...allParam[key], ...params[key] }
            } else {
              allParam[key] = params[key]
            }
          })
        }
      })

      // Add the fully decorated getStory function.
      this._storyStore.addStory(
        kind,
        storyName,
        fn,
        allParam
      )

      console.log('add', kind, storyName)
      return api
    }

    api.addDecorator = decorator => {
      localDecorators.push(decorator)
      return api
    }

    api.addParameters = parameters => {
      localParameters = { ...localParameters, ...parameters }
      return api
    }

    return api
  }

  getStorybook = () => {
    return this._storyStore.getStoryKinds().map((kind) => {
      const fileName = this._storyStore.getStoryFileName(kind)

      const stories = this._storyStore.getStories(kind).map((name) => {
        const render = this._storyStore.getStoryWithContext(kind, name)
        return { name, render }
      })

      return { kind, fileName, stories }
    })
  }
}
