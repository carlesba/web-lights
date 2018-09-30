import React, { createContext } from 'react'

const context = createContext({ state: {} })

export const Provider = context.Provider
export const Consumer = props => <context.Consumer {...props} />
