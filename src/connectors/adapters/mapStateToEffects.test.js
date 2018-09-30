import mapStateToEffects from './mapStateToEffects'

describe(mapStateToEffects, () => {
  it('pass state and setState to each effect passed', () => {
    const state = { count: 1 }
    const dispatch = jest.fn()
    const effects = {
      updateRemotely: payload => (dispatch, state) => {
        dispatch(state, payload)
      }
    }
    const mappedEffects = mapStateToEffects(state, dispatch, effects)
    expect(Object.keys(mappedEffects)).toEqual(Object.keys(effects))
    mappedEffects.updateRemotely(3)
    expect(dispatch).toHaveBeenCalledWith(state, 3)
  })
})
