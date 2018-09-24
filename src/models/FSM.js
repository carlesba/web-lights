import { curry, prop, call } from 'ramda'

const listToObject = (fn, list) =>
  list.reduce((acc, key) => ({...acc, [key]: fn(key)}), {})

const patternValidation = curry((states, config) => {
  if (!states.every(state => config[state])) {
    throw 'Every pattern should be covered'
  }
  return config
})

const SM = (name, validate) => ({
  match: patterns => (
    [patterns]
      .map(validate)
      .map(prop(name))
      .map(call())
      .shift()
  )
})

/**
 * Finite-State Machine
 * @param {Array} states
 */
const FSM = states => {
  const $ = listToObject(name => SM(name, patternValidation(states)), states)
  return ({
    ...$,
    when: patterns => {
      patternValidation(states, patterns)
      const target = states.find(state => patterns[state]())
      if(!target){
        throw 'None of the patterns matched'
      }
      return $[target]
    }
  })
}

export default FSM
