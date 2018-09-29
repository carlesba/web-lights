import React from 'react'
import Container from 'adapters/Container'
import { getCurrentPage } from 'state/selectors'

const presenter = {
  selectors: { getCurrentPage }
}

const Router = ({children}) => (
  <Container {...presenter}>{$ => children($.getCurrentPage()) }</Container>
)

export default Router
