import React from 'react'
import './App.css'
import Provider from 'adapters/Provider'
import HueFinder from './containers/HueFinder'
import handlers from 'state/handlers'

const initialState = {}

const middleware = (state, action, nextState) => {
  console.log('::state', state)
  console.log('action>>', action)
  console.log('nextState::', nextState)
}

const App = () => (
  <Provider
    initialState={initialState}
    handlers={handlers}
    middleware={middleware}
  >
    <HueFinder />
  </Provider>
)

export default App
