import {of, reject} from 'fluture'
import * as Failure from 'types/Failure'
import { setConfig, notifyProblem, updateLights} from 'state/actions'
import {compose, equals, path, tap} from 'ramda'
import { clearProblems } from '../state/actions';

export const findHueIp = Storage =>
  Storage.discoverHue().mapRej(() => Failure.NoInternet)

const getUsername = path(['0', 'success', 'username'])
const getErrorResponseType = path(['0', 'error', 'type'])
const isPressLinkButtonError = compose(equals(101), getErrorResponseType)

const getPostAppError = errorResponse => isPressLinkButtonError(errorResponse)
  ? Failure.PressLinkButton
  : Failure.CannotCreateApp

const createAppInHue = ({Storage, ip}) =>
  Storage.postAppInHue(ip).chain(response =>
    getUsername(response)
      ? of(getUsername(response))
      : reject(getPostAppError(response))
  )

const getUserName = ({Storage, ip}) =>
  Storage.getLocalConfig()
    .chainRej(() => createAppInHue({Storage, ip}))

const syncLights = Storage => config =>
  Storage.syncLights(config)
    .mapRej(() => Failure.CannotSyncHue)

const getHueConfig = Storage =>
  findHueIp(Storage).chain(ip =>
    getUserName({Storage, ip}).map(username => ({ip, username}))
  )

const connect = Storage => () => dispatch => {
  of(dispatch(clearProblems()))
    .chain(() => getHueConfig(Storage))
    .map(tap(config => Storage.saveUsername(config.username)))
    .map(tap(config => dispatch(setConfig(config))))
    .chain(syncLights(Storage))
    .fork(
      reason => dispatch(notifyProblem(reason)),
      lights => dispatch(updateLights(lights))
    )
}

export default connect
