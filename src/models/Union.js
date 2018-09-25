import { mapObjIndexed, prop, tap, either } from 'ramda'

// Translators
const listToObject = (fn, list) =>
  list.reduce((acc, key) => ({...acc, [key]: fn(key)}), {})

const matchPattern = types => patterns =>
  types.reduce((prev, type) => {
    if(prev.type) return prev
    const value = patterns[type]()
    return !value ? prev : {type, value}
  }, {})

// Errors
const throwMissingTypes = () => {
  throw new Error('Every pattern should be covered')
}
const throwTypeShouldBeString = type => {
  throw new Error(`State Machine should be an String. Found: ${typeof type}`)
}
const throwPatternNotFound = () => {
  throw new Error('Non of the patterns matched')
}

// Validators
const coverAllPatterns = types => patterns =>
  types.every(type => patterns[type])

const checkString = x => typeof x === 'string' && x
const validateTypeString = either(checkString, throwTypeShouldBeString)
const checkPattern = either(prop('type'), throwPatternNotFound)


/**
 * Union Types
 * @param {Array} types
 */
const Union = (name, types) => {
  const validatePatterns = either(coverAllPatterns(types), throwMissingTypes)
  const proto = {
    toString () { return `${name}(${this.type})` },
    match (patterns) {
      return [patterns]
      .map(tap(p => validatePatterns(p)))
      .map(prop(this.type))
      .map(pattern => pattern(this.value))
      .shift()
    }
  }
  const UnionTypes = listToObject(type => {
    validateTypeString(type)
    return value => Object.create(proto, {
      value: { value },
      type: { value: type },
      union: { value: name },
      unionTypes: { value: types }
    })
  }, types)

  const UnionTypePrototype = {
    types: UnionTypes,
    when (patterns) {
      return [patterns]
        .map(tap(validatePatterns))
        .map(matchPattern(types))
        .map(tap(checkPattern))
        .map(({type, value}) => this.types[type](value))
        .shift()
    }
  }
  const UnionTypeValues = mapObjIndexed(
    value => ({ value, enumerable: true }),
    UnionTypes
  )
  return Object.create(UnionTypePrototype, UnionTypeValues)
}

export default Union
