const Given = value => ({
  when: conditions => ({
    do: callbacks => {
      if (callbacks.length !== conditions.length + 1) {
        throw new Error(`[GWD] .do() needs ${conditions.length + 1} callbacks. Found ${callbacks.length} instead.`)
      }
      const conditionIndex = conditions
        .findIndex(condition => condition(value))
      return callbacks[conditionIndex]
        ? callbacks[conditionIndex](value)
        : callbacks[callbacks.length - 1](value)
    }
  })
})

export default Given
