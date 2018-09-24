import mapObject from './mapObject'

export default (dispatch, actions) =>
  mapObject(action => payload => dispatch(action(payload)), actions)
