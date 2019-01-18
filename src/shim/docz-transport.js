/* eslint-disable no-underscore-dangle */

import Channel from '@storybook/channels'
import { PostmsgTransport } from 'node_modules/@storybook/channel-postmessage'

export const KEY = 'storybook-channel'

export class DoczTransport extends PostmsgTransport {
  setHandler(handler) {
    this._handler = handler
  }

  send(event) {
    this._handler(event)
  }
}

export default function createChannel({ page }) {
  const transport = new DoczTransport({ page })
  return new Channel({ transport })
}
