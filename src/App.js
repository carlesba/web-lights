import React from 'react'
import './App.css'
import Provider from 'adapters/Provider'
import ConnectPage from 'containers/ConnectPage'
import handlers, {initialState} from 'state/handlers'

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
    <ConnectPage />
  </Provider>
)

export default App
