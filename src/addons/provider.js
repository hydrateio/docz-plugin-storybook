import createChannel from 'docz-plugin-storybook/channel-postmessage'
import Events from 'docz-plugin-storybook/core-events'
import { Provider } from 'storybook-ui-standalone'

import addons from '@storybook/addons'

export default class ReactProvider extends Provider {
  constructor() {
    super()
    this.channel = createChannel({ page: 'manager' })
    addons.setChannel(this.channel)

    this.channel.emit(Events.CHANNEL_CREATED)
  }

  getPanels() {
    return addons.getPanels()
  }

  renderPreview(selectedKind, selectedStory) {
    // TODO

    return null
  }

  handleAPI(api) {
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
