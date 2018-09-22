import * as Failure from 'types/Failure'
import { setConfig, showError, updateLights} from '../actions'

const tap = fn => value => {
  fn(value)
  return value
}

export const findHueIp = Storage =>
  Storage.discoverHue().bimap(
    () => Failure.NoInternet,
    ip => ({ ip })
  )

const createAppInHue = Storage =>
  Storage.postAppInHue()
    .mapRej(() => Failure.CannotCreateApp)

const getUserName = Storage =>
  Storage.getLocalConfig()
    .chainRej(() => createAppInHue(Storage))

const getHueConfig = Storage =>
  findHueIp(Storage)
    .chain(config =>
      getUserName(Storage).map(username => ({...config, username}))
    )

const syncLights = (Storage, config) =>
  Storage.syncLights(config)
    .mapRej(() => Failure.CannotSyncHue)

const connect = Storage => () => (setState, state) =>
  getHueConfig(Storage)
    .map(tap(config => setState(setConfig(config))))
    .chain(config => syncLights(Storage, config))
    .fork(
      reason => setState(showError(reason)),
      lights => setState(updateLights(lights))
    )

export default connect
