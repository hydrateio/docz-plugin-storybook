import React from 'react'
import Frame from 'react-frame-component'

import StyledFrame from 'react-styled-frame'
import StyledShadow from 'react-styled-shadow-dom'

export default (props) => {
  const { wrapper, ...rest } = props

  if (wrapper === 'styled-frame') {
    return <StyledFrame {...rest} />
  }

  if (wrapper === 'shadow-dom') {
    return <StyledShadow {...rest} />
  }

  const { children, style, ...theRest } = rest

  return (
    <Frame
      style={{
        height: 50,
        width: 320,
        display: 'block',
        overflow: 'scroll',
        border: 0,
        ...style
      }}
      {...theRest}
    >
      {children}
    </Frame>
  )
}
