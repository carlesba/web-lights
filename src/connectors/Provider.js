import React from 'react'
import * as context from './context'
import {prop} from 'ramda'

const getType = prop('type')

export default class Provider extends React.Component {
  constructor (props) {
    super(props)
    this.state = props.initialState
  }
  api = () => ({
    state: this.state,
    dispatch: this.dispatch
  })
  dispatch = action => {
    const handler = prop(getType(action), this.props.handlers)
    const nextState = handler
      ? handler(this.state, action.payload)
      : this.state
    this.props.middleware && this.props.middleware(this.state, action, nextState)
    handler && this.setState(nextState)
  }
  render () {
    return (
      <context.Provider value={this.api()}>
        {this.props.children}
      </context.Provider>
    )
  }
}
