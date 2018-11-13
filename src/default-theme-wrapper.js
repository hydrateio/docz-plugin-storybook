import React, { Component } from 'react'
import renderStorybookUI from 'storybook-ui-standalone'

import Provider from './addons/provider'

// this component will get mounted as the theme's root
export default class DoczPluginStorybookDefaultThemeWrapper extends Component {
  componentDidMount() {
    renderStorybookUI(this._ui, new Provider())
  }

  render() {
    const {
      children,
      ...rest
    } = this.props

    return (
      <div
        {...rest}
      >
        {children}

        <div ref={this._uiRef} />
      </div>
    )
  }

  _uiRef = (ref) => {
    this._ui = ref
  }
}
