import Given from './GWD'

describe('GivenWhenDo', () => {
  it('uses value passed to Given, finds the first condition that returns a truthy value on .when and runs the callback that matches with same index in .do', () => {
    const result = Given(10)
      .when([
        value => value < 3,
        value => value >= 3
      ])
      .do([
        value => value + 'a',
        value => value + 'b',
        value => value + 'c'
      ])
    expect(result).toBe('10b')
  })
  it('uses last .do callback when no condition is true', () => {
    const result = Given(3)
      .when([
        value => value < 3,
        value => value > 3
      ])
      .do([
        value => value + 'a',
        value => value + 'b',
        value => value + 'c'
      ])
    expect(result).toBe('3c')
  })
  describe('problems', () => {
    it('throws an error when number of .do callbacks is not the number of condtions + 1', () => {
      expect(() => {
        Given(1)
          .when([
            value => value < 3,
            value => value >= 3
          ])
          .do([
            x => x + 1
          ])
      }).toThrow()
    })
  })
})