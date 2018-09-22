import mapStateToActions from './mapStateToActions'

describe(mapStateToActions, () => {
  it('pass state to each action and runs setState after its called', () => {
    const state = {
      count: 1
    }
    const setState = jest.fn()
    const actions = {
      increment: payload => state => ({
        ...state,
        count: state.count + payload
      })
    }
    const mappedActions = mapStateToActions(state, setState, actions)
    expect(Object.keys(mappedActions)).toEqual(Object.keys(actions))
    mappedActions.increment(3)
    expect(setState).toHaveBeenCalledWith({ count: 4 })
  })
})
