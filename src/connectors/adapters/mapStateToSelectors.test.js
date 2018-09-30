import mapStateToSelectors from './mapStateToSelectors'

describe(mapStateToSelectors, () => {
  it('adds state as for each selector passed', () => {
    const state = { a: 1 }
    const selectors = {
      getAplus: number => state => state.a + number
    }
    const o = mapStateToSelectors(state, selectors)
    expect(Object.keys(o)).toEqual(Object.keys(selectors))
    expect(o.getAplus(3)).toBe(state.a + 3)
  })
})
