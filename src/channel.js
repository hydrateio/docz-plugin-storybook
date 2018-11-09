import addons from '@storybook/addons'
import createChannel from '@storybook/channel-postmessage'

export const channel = createChannel({ page: 'manager' })
addons.setChannel(channel)
