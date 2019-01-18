import React, { Component } from 'react'
import renderStorybookUI from 'storybook-ui-standalone'

import Provider from './addons/provider'

// this component will get mounted as the theme's root
export default class DoczPluginStorybookDefaultThemeWrapper extends Component {
  componentDidMount() {
    console.log('mounting theme wrapper')
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
        <div ref={this._uiRef} />

        {children}
      </div>
    )
  }

  _uiRef = (ref) => {
    this._ui = ref
  }
}
