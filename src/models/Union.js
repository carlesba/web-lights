import { curry, prop } from 'ramda'

const listToObject = (fn, list) =>
  list.reduce((acc, key) => ({...acc, [key]: fn(key)}), {})

const patternValidation = curry((states, config) => {
  if (!states.every(state => config[state])) {
    throw 'Every pattern should be covered'
  }
  return config
})

const createUnion = types => type =>
  value => ({
    match: patterns => [patterns]
      .map(patternValidation(types))
      .map(prop(type))
      .map(pattern => pattern(value))
      .shift()
  })

/**
 * Union Types
 * @param {Array} types
 */
const Union = types => {
  const $ = listToObject(createUnion(types), types)
  return ({
    ...$,
    when: patterns => {
      patternValidation(types, patterns)
      const output = types.reduce((prev, type) => {
        if(prev.type) return prev
        const value = patterns[type]()
        return !value ? prev : {type, value}
      }, {})
      if(!output.type){
        throw 'None of the patterns matched'
      }
      const {type, value} = output
      return $[type](value)
    }
  })
}

export default Union
