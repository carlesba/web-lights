import FSM from './FSM'
import { always, keys } from 'ramda'

describe('FSM', () => {
  const True = always(true)
  const False = always(false)
  const states = ['Red', 'Yellow', 'Green']
  const TrafficLight = FSM(states)
  it('creates the FSM and its methods', () => {
    expect(keys(TrafficLight)).toEqual(states.concat('when'))
  })
  it('returns the state that matches given a pattern configuration', () => {
    expect(TrafficLight.when({
      Red: True,
      Yellow: True,
      Green: True
    })).toBe(TrafficLight.Red)
    expect(TrafficLight.when({
      Red: False,
      Yellow: True,
      Green: True
    })).toBe(TrafficLight.Yellow)
    expect(() => TrafficLight.when({
      Green: True
    })).toThrow()
    expect(() => TrafficLight.when({
      Red: False,
      Yellow: False,
      Green: False
    })).toThrow()
  })
  it('does pattern-matching using .match on any of the states', () => {
    const patterns = {
      Red: () => 1,
      Yellow: () => 2,
      Green: () => 3,
    }
    expect(TrafficLight.Red.match(patterns)).toBe(1)
    expect(TrafficLight.Yellow.match(patterns)).toBe(2)
    expect(TrafficLight.Green.match(patterns)).toBe(3)
  })
})
