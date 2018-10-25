import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { _clientAPI } from '../shim'

export default class Story extends PureComponent {
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

    console.log(story)

    return (
      <div
        {...rest}
      >
        {story()}
      </div>
    )
  }
}
