import React from 'react'
import Provider from 'adapters/Provider'
import ConnectPage from 'containers/ConnectPage'
import Notifications from 'containers/Notifications'
import handlers, {initialState} from 'state/handlers'
import Logo from './views/Logo'
import DashboardPage from 'containers/DashboardPage'
import Router from 'containers/Router'

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
    <Logo>Web Lights</Logo>
    <Notifications />
    <Router>{page => page.match({
      Connect: ConnectPage,
      Dashboard: DashboardPage
    })}</Router>
  </Provider>
)

export default App
