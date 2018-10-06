import { of, reject } from 'fluture'
import { path, pipe, equals, tap } from 'ramda'
import {
  clearNotification,
  connectBridge
} from 'state/actions'
import HueConnectionErrors from 'unions/HueConnectionErrors'

const getUsername = path(['0', 'success', 'username'])

const isPressLinkButtonError = pipe(path(['0', 'error', 'type']), equals(101))

export const findHueIp = Storage =>
  Storage.discoverHue()
    .mapRej(() => HueConnectionErrors.NoInternet)


const getPostAppError = errorResponse => isPressLinkButtonError(errorResponse)
  ? HueConnectionErrors.PressButton
  : HueConnectionErrors.BadRequest

const createAppInHue = ({Storage, ip}) =>
  Storage.postAppInHue(ip).chain(response => getUsername(response)
    ? of(getUsername(response))
    : reject(getPostAppError(response))
  )

const getUserName = ({Storage, ip}) =>
  Storage.getLocalConfig()
    .chainRej(() => createAppInHue({Storage, ip}))

const getHueConfig = Storage =>
  findHueIp(Storage)
    .chain(ip => getUserName({Storage, ip})
      .map(username => ({ip, username}))
    )

const setupHue = ({dispatch, Storage}) =>
  getHueConfig(Storage)
    .map(tap(() => dispatch(clearNotification())))
    .map(tap(config => Storage.saveUsername(config.username)))
    .map(tap(config => dispatch(connectBridge(config))))

export default setupHue
