import React from 'react'
import Container from './Container'
import { mount } from 'enzyme'
import {Consumer} from './context'
import Provider from './Provider'

describe('Container', () => {
  const state = { a: 1 }
  it('mounts a Consumer', () => {
    const wrapper = mount(
      <Provider initialState={state}>
        <Container>{() => <div />}</Container>
      </Provider>
    )
    expect(wrapper.find(Consumer).length).toBe(1)
  })
  it('passes actions, selectors and effects merged for its children', () => {
    const selectors = { select: jest.fn(() => () => {}) }
    const actions = { action: jest.fn(() => () => {}) }
    const effects = { effect: jest.fn(() => () => {}) }
    const Foo = () => <div />
    const wrapper = mount(
      <Provider initialState={state}>
        <Container
          selectors={selectors}
          actions={actions}
          effects={effects}
        >
          {props => <Foo {...props} />}
        </Container>
      </Provider>
    )
    const childrenProps = wrapper.find(Foo).props()
    expect(childrenProps).toEqual({
      state,
      setState: expect.any(Function),
      action: expect.any(Function),
      select: expect.any(Function),
      effect: expect.any(Function)
    })
    childrenProps.action()
    expect(actions.action).toHaveBeenCalled()
    childrenProps.select()
    expect(selectors.select).toHaveBeenCalled()
    childrenProps.effect()
    expect(effects.effect).toHaveBeenCalled()
  })
})
