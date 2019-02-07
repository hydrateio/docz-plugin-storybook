import React, { Component } from 'react'
import PropTypes from 'prop-types'
import StoryWrapper from 'docz-plugin-storybook/story-wrapper'

import { _clientAPI } from '../shim'

export default class Story extends Component {
  static propTypes = {
    kind: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    usageInstructions: PropTypes.node
  }

  render() {
    const {
      kind,
      name,
      usageInstructions,
      ...rest
    } = this.props

    const story = _clientAPI.store.getStoryWithContext(kind, name)

    if (!story) {
      console.error('unable to find story', { kind, name })
      return (
        <div />
      )
    }

    if (usageInstructions) {
      const UsageInstructions = usageInstructions
      return (
        <React.Fragment>
          <StoryWrapper {...rest}>{story()}</StoryWrapper>
          <UsageInstructions />
        </React.Fragment>
      )
    }

    // TODO: should we show the kind or name?
    return <StoryWrapper {...rest}>{story()}</StoryWrapper>
  }
}
