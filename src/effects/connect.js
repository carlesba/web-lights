import {of, reject} from 'fluture'
import FSM from 'models/FSM'
import { equals, path, pipe, tap} from 'ramda'
import Storage from 'connectors/Storage'
import {
  checkHueBridge,
  connectBridge,
  clearNotification,
  sendNotification,
  showDashboard,
  updateLights
} from 'state/actions'

const Problems = FSM('Problems', ['PressButton', 'BadRequest', 'NoInternet'])

export const findHueIp = Storage =>
  Storage.discoverHue().mapRej(() => Problems.NoInternet)

const getUsername = path(['0', 'success', 'username'])
const isPressLinkButtonError = pipe(path(['0', 'error', 'type']), equals(101))

const getPostAppError = errorResponse => isPressLinkButtonError(errorResponse)
  ? Problems.PressButton
  : Problems.BadRequest

const createAppInHue = ({Storage, ip}) =>
  Storage.postAppInHue(ip).chain(response => getUsername(response)
    ? of(getUsername(response))
    : reject(getPostAppError(response))
  )

const getUserName = ({Storage, ip}) =>
  Storage.getLocalConfig()
    .chainRej(() => createAppInHue({Storage, ip}))

const syncLights = Storage => config =>
  Storage.syncLights(config)
    .mapRej(() => Problems.BadRequest)

const getHueConfig = Storage =>
  findHueIp(Storage)
    .chain(ip => getUserName({Storage, ip})
      .map(username => ({ip, username}))
    )

export const createConnect = Storage => ({dispatch}) => {
  getHueConfig(Storage)
    .map(tap(() => dispatch(clearNotification())))
    .map(tap(config => Storage.saveUsername(config.username)))
    .map(tap(config => dispatch(connectBridge(config))))
    .chain(syncLights(Storage))
    .map(tap(lights => dispatch(updateLights(lights))))
    .fork(
      problem => problem.match({
        PressButton: () => dispatch(checkHueBridge()),
        BadRequest: () => dispatch(sendNotification('BadRequest')),
        NoInternet: () => dispatch(sendNotification('BadRequest'))
      }),
      () => dispatch(showDashboard())
    )
}

export default createConnect(Storage)
