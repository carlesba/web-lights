import {keys} from 'ramda'

export default {
  updateLights: (state, {lights}) => ({
    ...state,
    lights: keys(lights).map(key => lights[key])
  }),
  setConfig: (state, {config}) => ({...state, config}),
  clearProblems: state => ({...state, problem: null}),
  notifyProblem: (state, {reason}) => ({ ...state, problem: reason })
}
