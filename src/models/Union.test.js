import Union from './Union'
import { always, keys } from 'ramda'

describe('Union', () => {
  const True = always(true)
  const False = always(false)
  const Red = always('red')
  const states = ['On', 'Off']
  const Light = Union(states)
  it('creates the Union and its methods', () => {
    expect(keys(Light)).toEqual(states.concat('when'))
  })
  it('returns the state that matches given a pattern configuration', () => {
    const lightOn = Light.when({
      On: Red,
      Off: True
    })
    expect(lightOn.match({On: color => color, Off: False })).toBe('red')

    const lightOff = Light.when({
      On: False,
      Off: True
    })
    expect(lightOff.match({ On: False, Off: True })).toBe(true)

    expect(() => Light.when({ On: True })).toThrow()
  })
})
