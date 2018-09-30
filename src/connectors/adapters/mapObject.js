const mapObject = (mapper, o) =>
  Object.keys(o).reduce((acc, key) => ({ ...acc, [key]: mapper(o[key]) }), {})

export default mapObject
