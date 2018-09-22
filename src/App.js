import React, { Component } from 'react'
import './App.css'
import Provider from 'adapters/Provider'
import HueFinder from './containers/HueFinder'

class App extends Component {
  render () {
    return (
      <Provider initialState={{}}>
        <HueFinder />
      </Provider>
    )
  }
}

export default App
