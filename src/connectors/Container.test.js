import React from 'react'
import Container from './Container'
import { mount } from 'enzyme'
import {Consumer} from './context'
import Provider from './Provider'

describe('Container', () => {
  const state = { a: 1 }
  it('mounts a Consumer', () => {
    const wrapper = mount(
      <Provider initialState={state} handlers={{}}>
        <Container>{() => <div />}</Container>
      </Provider>
    )
    expect(wrapper.find(Consumer).length).toBe(1)
  })
  it('passes actions, selectors and effects merged for its children', () => {
    const selectors = { select: jest.fn() }
    const actions = { action: jest.fn() }
    const effects = { effect: jest.fn() }
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
      getState: expect.any(Function),
      dispatch: expect.any(Function),
      action: expect.any(Function),
      select: expect.any(Function),
      effect: expect.any(Function)
    })
    expect(childrenProps.getState()).toBe(state)

    childrenProps.action('action')
    expect(actions.action).toHaveBeenCalledWith('action')
    childrenProps.select('select')
    expect(selectors.select).toHaveBeenCalledWith(state, 'select')
    childrenProps.effect('effect')
    expect(effects.effect).toHaveBeenCalledWith(
      {
        dispatch: expect.any(Function),
        getState: expect.any(Function)
      },
      'effect'
    )
  })
})
