import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'

import { _clientAPI } from '../shim'

import Story from './Story'

export default class Stories extends Component {
  static propTypes = {
    kind: PropTypes.string.isRequired
  }

  render() {
    const {
      kind,
      ...rest
    } = this.props

    const names = _clientAPI.store.getStories(kind)

    if (!names) {
      console.error('unable to find story', { kind })
      return (
        <div />
      )
    }

    return (
      <div
        {...rest}
      >
        {names.map((name) => (
          <Fragment
            key={name}
          >
            <h2>{name}</h2>

            <Story
              kind={kind}
              name={name}
            />
          </Fragment>
        ))}
      </div>
    )
  }
}
