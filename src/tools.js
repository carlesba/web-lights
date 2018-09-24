export const tap = fn => value => {
  fn(value)
  return value
}
