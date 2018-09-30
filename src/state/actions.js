const Action = (type, creator = () => {}) =>
  payload => ({type, payload: creator(payload)})


export const checkHueBridge = Action('checkHueBridge')

export const connectBridge = Action('connectBridge', config => ({config}))

export const clearNotification = Action('clearNotification')

export const sendNotification = Action('sendNotification', message => ({message}))

export const showPage = Action('showPage', page => ({page}))

export const showDashboard = () => showPage('dashboard')

export const updateLights = Action('updateLights', lights => ({lights}))
