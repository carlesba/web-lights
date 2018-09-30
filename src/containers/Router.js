import React from 'react'
import Container from 'connectors/Container'
import { getCurrentPage } from 'state/selectors'
import {Transition} from 'react-spring'
import Given from 'models/GWD'

const presenter = {
  selectors: { getCurrentPage }
}

const Router = ({children}) => (
  <Container {...presenter}>{$ => {
    const page = $.getCurrentPage()
    return React.Children.map(children, child =>
      React.cloneElement(child, { selected: child.props.page === page })
    )}
  }</Container>
)

const mapSideToAnimation = side => Given(side)
  .when([
    s => s === 'top',
    s => s === 'bottom',
    s => s === 'left',
    s => s === 'right'
  ])
  .do([
    () => ({
      from: { position: 'absolute', top: -100, left: 0 },
      enter: { top: 0 },
      leave: { top: -100 }
    }),
    () => ({
      from: { position: 'absolute', top: 100, left: 0 },
      enter: { top: 0 },
      leave: { top: 100 }
    }),
    () => ({
      from: { position: 'absolute', top: 100, left: -100 },
      enter: { left: 0 },
      leave: { left: -100 }
    }),
    () => ({
      from: { position: 'absolute', top: 100, left: 100 },
      enter: { left: 0 },
      leave: { left: 100 }
    }),
    () => ({})
  ])

const mapStylesFromSpring = styles => ({
  ...styles,
  top: typeof styles.top === 'number' ? `${styles.top}%` : undefined
})

export const Route = ({page, side, selected, children}) => (
  <Transition {...mapSideToAnimation(side)} >
    {selected && (styles =>
      <div style={mapStylesFromSpring(styles)}>
        {children}
      </div>
    )}
  </Transition>
)

export default Router
