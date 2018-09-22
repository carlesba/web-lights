import React from 'react'
import * as context from './context'

export default class Provider extends React.Component {
  constructor (props) {
    super(props)
    this.state = props.initialState
  }
  updateState = state => this.setState(state)
  api = () => ({
    state: this.state,
    setState: this.updateState
  })
  render () {
    return (
      <context.Provider value={this.api()}>
        {this.props.children}
      </context.Provider>
    )
  }
}
