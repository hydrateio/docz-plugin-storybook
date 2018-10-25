import React from 'react'
import PropTypes from 'prop-types'

const Button = ({ onClick, children }) => (
  <button onClick={onClick}>{children}</button>
)

Button.propTypes = {
  children: PropTypes.any,
  onClick: PropTypes.func
}

export default Button
