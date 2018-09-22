import mapObject from './mapObject'

export default (state, setState, effects) =>
  mapObject(effect => payload => effect(payload)(setState, state), effects)
