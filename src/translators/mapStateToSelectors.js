import mapObject from './mapObject'

export default (state, selectors) =>
  mapObject(selector => payload => selector(payload)(state), selectors)
