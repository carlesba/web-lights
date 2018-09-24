import React from 'react'
import Provider from './Provider'
import * as context from './context'
import { shallow } from 'enzyme'

describe('Provider', () => {
  const initialState = { a: 1 }
  it('uses initialState as initial state', () => {
    const wrapper = shallow(<Provider initialState={initialState} />)
    expect(wrapper.state()).toBe(initialState)
  })
  it('provides state and dispatch functions to context.Provider', () => {
    const wrapper = shallow(
      <Provider initialState={initialState}>
        {props => <div props={props} />}
      </Provider>
    )
    expect(wrapper.find(context.Provider).props()).toEqual({
      value: {
        state: initialState,
        dispatch: expect.any(Function)
      },
      children: expect.any(Function)
    })
  })
  it('provides dispatch function that triggers handlers when event.type matches one of them', () => {
    const handlers = {foo: jest.fn(() => ({ a: 2 }))}
    const wrapper = shallow(
      <Provider initialState={initialState} handlers={handlers}>
        {props => <div props={props} />}
      </Provider>
    )
    wrapper.find(context.Provider).props().value.dispatch({type: 'foo'})
    expect(wrapper.state()).toEqual({a: 2})
  })
  it('calls middleware passed by props on every dispatch', () => {
    const middleware = jest.fn()
    const handlers = {
      foo: () => ({a: 2})
    }
    const wrapper = shallow(
      <Provider
        initialState={initialState}
        handlers={handlers}
        middleware={middleware}>
        {props => <div props={props} />}
      </Provider>
    )
    wrapper.find(context.Provider).props().value.dispatch({type: 'foo'})
    expect(middleware).toHaveBeenCalledWith({a: 1}, {type: 'foo'}, ({a: 2}))
  })
})
