import React from 'react'
import Provider from 'connectors/Provider'
import ConnectPage from 'containers/ConnectPage'
import Notifications from 'containers/Notifications'
import handlers, {initialState} from 'state/handlers'
import DashboardPage from 'containers/DashboardPage'
import Router, {Route} from 'containers/Router'
import Storage from 'connectors/Storage'

const middleware = (state, action, nextState) => {
  console.log('::state', state)
  console.log('action>>', action)
  console.log('nextState::', nextState)
}

const App = () => (
  <Provider
    initialState={initialState}
    handlers={handlers}
    services={{Storage}}
    middleware={middleware}
  >
    <Notifications />
    <Router>
      <Route page='connect' initial={false} side='top'><ConnectPage /></Route>
      <Route page='dashboard' side='bottom'><DashboardPage /></Route>
    </Router>
  </Provider>
)

export default App
