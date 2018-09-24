import mapDispatchToActions from './mapDispatchToActions'

describe(mapDispatchToActions, () => {
  it('pass state to each action and runs setState after its called', () => {
    const dispatch = jest.fn()
    const actions = {
      increment: () => ({type: 'increment'})
    }
    const mappedActions = mapDispatchToActions(dispatch, actions)
    expect(Object.keys(mappedActions)).toEqual(Object.keys(actions))
    mappedActions.increment(3)
    expect(dispatch).toHaveBeenCalledWith({ type: 'increment'})
  })
})
