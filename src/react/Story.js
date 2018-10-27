import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { _clientAPI } from '../shim'

export default class Story extends Component {
  static propTypes = {
    kind: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  }

  render() {
    const {
      kind,
      name,
      ...rest
    } = this.props

    const story = _clientAPI.store.getStoryWithContext(kind, name)

    if (!story) {
      console.error('unable to find story', { kind, name })
      return (
        <div />
      )
    }

    // TODO: should we show the kind or name?

    return (
      <div
        {...rest}
      >
        {story()}
      </div>
    )
  }
}
