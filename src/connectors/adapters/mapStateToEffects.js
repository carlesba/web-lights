import mapObject from './mapObject'

export default (state, dispatch, effects) =>
  mapObject(effect => payload => effect(payload)(dispatch, state), effects)
