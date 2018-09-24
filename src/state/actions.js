const Action = (type, creator) =>
  payload => ({type, payload: creator(payload)})

export const updateLights = Action('updateLights', lights => ({lights}))

export const setConfig = Action('setConfig', config => ({config}))

export const clearProblems = Action('clearProblems', () => ({}))

export const notifyProblem = Action('notifyProblem', ({reason}) => ({reason}))
