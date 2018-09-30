import React from 'react'
import styled from 'styled-components'

const Logo = styled.div`
  font-family: 'Monoton', cursive;
  font-size: 40px;
  position: fixed;
  color: #4dffbb;
  text-shadow: 1px 2px 3px #00fa9a;
`
Logo.displayName = 'Logo'

export default () => <Logo>Web Lights</Logo>
