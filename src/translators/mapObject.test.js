import mapObject from './mapObject'

describe(mapObject, () => {
  test('returns a new object with same keys and the output of the callback applied for each key', () => {
    const i = { a: 1, b: 2, c: 3 }
    const add1 = x => x + 1
    const o = mapObject(add1, i)
    expect(o).toEqual({ a: 2, b: 3, c: 4 })
  })
})
