import { mapObjIndexed, prop, tap, either } from 'ramda'

// Translators
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

  const createUnionTypePrototype = type => ({
    __type__: type,
    __union__: name,
    __unionTypes__: types,
    toString () { return `${this.__union__}.${this.__type__}[]` },
    match (patterns) {
      return [patterns]
      .map(tap(p => validatePatterns(p)))
      .map(prop(this.__type__))
      .map(pattern => pattern(this.value))
      .shift()
    }
  })
  const createUnionType = unionTypePrototype =>
    value => Object.create(unionTypePrototype, { value: { value } })

  const UnionTypes = types
    .map(tap(validateTypeString))
    .map(createUnionTypePrototype)
    .reduce((prev, current) => ({
      ...prev,
      [current.__type__]: createUnionType(current)
    }), {})

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
