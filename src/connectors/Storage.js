import { tryP, of, reject } from 'fluture'
import 'whatwg-fetch'
import {path, props} from 'ramda'

const devicetype = 'room-lights/app'

const getLocalConfig = localStorage =>
  () => localStorage.getItem('hue.username')
    ? of(localStorage.getItem('hue.username'))
    : reject()

const saveUsername = local => username =>
  of(local.setItem('hue.username', username))

const discoverHue = fetch => () => fetch('https://discovery.meethue.com/')
  .map(path(['0', 'internalipaddress']))

const postAppInHue = fetch => ip =>
  fetch(`http://${ip}/api`, {
    method: 'POST',
    body: JSON.stringify({ devicetype })
  })


const syncLights = fetch => config =>
  of(config)
    .map(props(['ip', 'username']))
    .map(([ip, username]) => `http://${ip}/api/${username}/lights`)
    .chain(url => fetch(url))

const updateLightState = fetch => (config, lightId, payload) =>
  of(config)
    .map(props(['ip', 'username']))
    .map(([ip, username]) => `http://${ip}/api/${username}/lights/${lightId}/state`)
    .chain(url => fetch(url, {
      method: 'PUT',
      body: JSON.stringify(payload)
    }))

export const createStorage = ({remote, local}) => ({
  getLocalConfig: getLocalConfig(local),
  saveUsername: saveUsername(local),
  discoverHue: discoverHue(remote),
  postAppInHue: postAppInHue(remote),
  syncLights: syncLights(remote),
  updateLightState : updateLightState(remote)
})

export default createStorage({
  remote: (url, payload) =>
    tryP(() => fetch(url, payload)).chain(res => tryP(_ => res.json())),
  local: window.localStorage
})
