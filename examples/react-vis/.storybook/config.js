import {configure} from '@storybook/react'

function loadStories() {
  require('../storybook/index.js')
}

configure(loadStories, module)
