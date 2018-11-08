import React from 'react'
import styled from 'styled-components'

const Button = ({ onClick, children }) => <button onClick={onClick}>{children}</button>

const StyledButton = styled('button')`
  appearance: none;
  background: purple;
  color: white;
`

export default Button
export { StyledButton }
