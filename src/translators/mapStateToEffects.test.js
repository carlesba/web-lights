import mapStateToEffects from './mapStateToEffects'

describe(mapStateToEffects, () => {
  it('pass state and setState to each effect passed', () => {
    const state = { count: 1 }
    const setState = jest.fn()
    const effects = {
      updateRemotely: payload => (setState, state) => {
        setState(state, payload)
      }
    }
    const mappedEffects = mapStateToEffects(state, setState, effects)
    expect(Object.keys(mappedEffects)).toEqual(Object.keys(effects))
    mappedEffects.updateRemotely(3)
    expect(setState).toHaveBeenCalledWith(state, 3)
  })
})
