import Events from 'docz-plugin-storybook/core-events'
import { Provider } from 'storybook-ui-standalone'
import { channel } from '../shim/channel'

import addons from '@storybook/addons'

export const ADDON_LOADED_EVENT = 'docz-plugin-storybook::ADDON_LOADED'

export default class ReactProvider extends Provider {
  constructor() {
    super()
    this.lastUsedApi = null
    this.channel = channel
    addons.setChannel(this.channel)

    this.channel.emit(Events.CHANNEL_CREATED)

    this.channel.on(ADDON_LOADED_EVENT, () => { this.reloadAddons() })
  }

  getPanels() {
    return addons.getPanels()
  }

  renderPreview(selectedKind, selectedStory) {
    // TODO
    console.log('provider.renderPreview', selectedKind, selectedStory)

    return null
  }

  reloadAddons = (...args) => {
    console.log('Loading new addon', args[0])
    addons.loadAddons(this.lastUsedApi)

    console.log('Loaded Panels', {...addons.getPanels()})
  }

  handleAPI(api) {
    console.log('handling API')
    this.lastUsedApi = api
    api.onStory((kind, story) => {
      this.channel.emit(Events.SET_CURRENT_STORY, { kind, story })
    })

    this.channel.on(Events.SET_STORIES, data => {
      api.setStories(data.stories)
    })

    this.channel.on(Events.SELECT_STORY, data => {
      api.selectStory(data.kind, data.story)
    })

    this.channel.on(Events.APPLY_SHORTCUT, data => {
      api.handleShortcut(data.event)
    })

    api.setOptions({
      shortcutOptions: {
        goFullScreen: false,
        showStoriesPanel: false,
        showAddonPanel: true,
        showSearchBox: false,
        addonPanelInRight: false,
        enableShortcuts: false
      }
    })

    addons.loadAddons(api)
  }
}
