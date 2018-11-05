import React from 'react'

const defaultWrapper = ({ children, ...rest }) => (
  <div {...rest}>{children}</div>
)

defaultWrapper.displayName = 'docz-plugin-storybook.defaultWrapper'

export default defaultWrapper
