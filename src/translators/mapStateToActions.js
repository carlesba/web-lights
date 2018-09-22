import mapObject from './mapObject'

export default (state, setState, actions) =>
  mapObject(action => payload => setState(action(payload)(state)), actions)
