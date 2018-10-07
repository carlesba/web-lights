export const initialState = {
  bridgeAccessRequired: false,
  config: {},
  navigation: {
    page: 'connect'
  },
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
  showPage: (state, {page}) => ({
    ...state,
    navigation: {
      ...state.navigation,
      page
    }
  }),
  updateLights: (state, {lights}) => ({
    ...state,
    lights
  })
}
