import {keys} from 'ramda'

export const initialState = {
  bridgeAccessRequired: false,
  config: {},
  notification: null,
  lights: []
}

export default {
  checkHueBridge: state => ({...state, bridgeAccessRequired: true}),
  connectBridge: (state, {config}) =>({
    ...state, config, bridgeAccessRequired: false
  }),
  clearNotification: state => ({...state, notification: null }),
  sendNotification: (state, {message}) => ({
    ...state,
    notification: message
  }),
  updateLights: (state, {lights}) => ({
    ...state,
    lights: keys(lights).map(key => lights[key])
  })
}
