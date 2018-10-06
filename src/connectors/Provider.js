import React from 'react'
import * as context from './context'
import {prop} from 'ramda'

const getType = prop('type')

export default class Provider extends React.Component {
  constructor (props) {
    super(props)
    this.state = props.initialState
  }
  getState = () => this.state
  api = () => ({
    ...this.props.services,
    getState: this.getState,
    dispatch: this.dispatch
  })
  runMiddleware = (action, nextState) => {
    const {middleware} = this.props
    middleware && middleware(this.state, action, nextState)
  }
  dispatch = action => {
    const handler = prop(getType(action), this.props.handlers)
    const nextState = handler
      ? handler(this.state, action.payload)
      : this.state
    this.runMiddleware(action, nextState)
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
