import {tap} from 'ramda'

const validateString = type => {
  if (typeof type !== 'string') {
    throw new Error(`State Machine should be an String. Found: ${typeof type}`)
  }
}

/**
 * Finite-State Machine
 * @param {Array} states
 */
const FSM = (groupName, states) => {
  const validatePatterns = patterns => {
    if (!states.every(state => patterns[state])) {
      throw new Error(`[FSM(${groupName}).match(patterns)] Every pattern should be covered`)
    }
  }
  const proto = {
    __states__: states,
    __group__: groupName,
    toString () { return `${this.FSM}(${this.state})` },
    match (patterns) {
      validatePatterns(patterns)
      return patterns[this.state](this.state)
    }
  }
  const createFS = state => Object.create(proto, {
    state: { value: state, enumerable: true }
  })

  const FiniteStates = states
    .map(tap(validateString))
    .reduce((prev, state) => ({
      ...prev,
      [state]: createFS(state)
    }), {})

  return ({
    ...FiniteStates,
    when: patterns => {
      validatePatterns(patterns)
      const target = states.find(state => patterns[state]())
      if(!target){ throw new Error('None of the patterns matched') }
      return FiniteStates[target]
    }
  })
}

export default FSM
