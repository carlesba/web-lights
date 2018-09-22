import { encaseP, tryP, of, reject } from 'fluture'
import 'whatwg-fetch'

const localStorage = window.localStorage
const fetch = (url) => encaseP(window.fetch)(url)
    .chain(res => tryP(_ => res.json()))

const devicetype = 'room-lights/app'

const getLocalConfig = () => localStorage.getItem('hue.username')
    ? of(localStorage.getItem('hue.username'))
    : reject()

const saveUsername = username =>
  of(localStorage.setItem('hue.username', username))


const discoverHue = () => fetch('https://discovery.meethue.com/')

const postAppInHue = config =>
  fetch(`http://${config.ip}/api`, {
    method: 'POST',
    body: JSON.stringify({ devicetype })
  })

const syncLights = config =>
  fetch(`http://${config.ip}/api/${config.username}/lights`)

const Storage = {
  getLocalConfig,
  saveUsername,
  discoverHue,
  postAppInHue,
  syncLights
}

export default Storage
