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
  it('provides state and setState functions to context.Provider', () => {
    const wrapper = shallow(
      <Provider initialState={initialState}>
        {props => <div props={props} />}
      </Provider>
    )
    expect(wrapper.find(context.Provider).props()).toEqual({
      value: {
        state: initialState,
        setState: expect.any(Function)
      },
      children: expect.any(Function)
    })
  })
  it('provides setState function that updates the state', () => {
    const wrapper = shallow(
      <Provider initialState={initialState}>
        {props => <div props={props} />}
      </Provider>
    )
    wrapper.find(context.Provider).props().value.setState({a: 2})
    expect(wrapper.state()).toEqual({a: 2})
  })
})
