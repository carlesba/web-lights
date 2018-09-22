export const updateLights = lights => state =>
  ({...state, lights})

export const setConfig = config => state => ({...state, config})

export const showError = failure => state => ({...state, error: {...failure}})

