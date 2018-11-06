import React from 'react'
import Frame from 'react-frame-component'

export default ({ children, style = {}, ...rest }) => {
  return (
    <Frame
      style={{
        width: 320,
        display: 'block',
        overflow: 'scroll',
        border: 0,
        ...style
      }}
      {...rest}
    >
      {children}
    </Frame>
  )
}
