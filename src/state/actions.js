const Action = (type, creator = () => {}) =>
  payload => ({type, payload: creator(payload)})


export const checkHueBridge = Action('checkHueBridge')

export const connectBridge = Action('connectBridge', config => ({config}))

export const clearNotification = Action('clearNotification')

export const sendNotification = Action('sendNotification', message => ({message}))

export const updateLights = Action('updateLights', lights => ({lights}))
