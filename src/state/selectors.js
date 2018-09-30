import Connection from 'types/Connection'
import Maybe from 'types/Maybe'
import FSM from 'models/FSM'
import { complement, prop, path, T } from 'ramda'

/**
 * State selectors
 */
const getConfigUsername = path(['config', 'username'])
const getBridgeIp = path(['config', 'ip'])
const getBridgeAccesRequired = prop('bridgeAccessRequired')
const currentPage = path(['navigation', 'page'])
const isConnected = state => (
    [ getConfigUsername, getBridgeIp, complement(getBridgeAccesRequired) ]
      .every(fn => fn(state))
)

/**
 * View Selectors
 */

export const getLights = () => state => Maybe.when({
  Some: () => prop('lights', state),
  None: T
})

export const getConnectionStatus = () => state =>
  Connection.when({
    Connected: () => isConnected(state) && ({
      username: getConfigUsername(state),
      ip: getBridgeIp(state)
    }),
    PressButton: () => getBridgeAccesRequired(state),
    Disconnected: T
  })

const Route = FSM('Route', ['Dashboard', 'Connect'])

export const getCurrentPage = () => state => Route.when({
  Dashboard: () => currentPage(state) === 'dashboard',
  Connect: () => currentPage(state) === 'connect'
})

export const getNotifications = () => state => Maybe.when({
    Some: () => prop('notification', state),
    None: T
  })
