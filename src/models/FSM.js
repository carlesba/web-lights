const listToObject = (fn, list) =>
  list.reduce((acc, key) => ({...acc, [key]: fn(key)}), {})

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
    parent () { return $ },
    toString () { return `${this.FSM}(${this.state})` },
    match (patterns) {
      validatePatterns(patterns)
      return patterns[this.state](this.state)
    }
  }
  const $ = listToObject(
    state => {
      if (typeof state !== 'string') {
        throw new Error(`State Machine should be an String. Found: ${typeof state}`)
      }
      return Object.create(proto, {
        state: { value: state, enumerable: true },
        FSM: { value: FSM }
      })
    },
    states
  )
  return ({
    ...$,
    when: patterns => {
      validatePatterns(patterns)
      const target = states.find(state => patterns[state]())
      if(!target){ throw new Error('None of the patterns matched') }
      return $[target]
    }
  })
}

export default FSM
