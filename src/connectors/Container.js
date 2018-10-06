import React from 'react'
import {Consumer} from './context'
import { mapObjIndexed } from 'ramda'

const bindState = (state, selectors) =>
  mapObjIndexed(selector => selector.bind(selector, state), selectors)

const bindDispatch = (dispatch, actions) =>
  mapObjIndexed(action => (...args) => dispatch(action(...args)), actions)

const bindContext = (context, effects) =>
  mapObjIndexed(effect => effect.bind(effect, context), effects)

const Container = ({selectors = {}, actions = {}, effects = {}, context = {}, children}) => (
  <Consumer>
    {providerContext =>
      children({
        getState: providerContext.getState,
        dispatch: providerContext.dispatch,
        ...bindState(providerContext.getState(), selectors),
        ...bindDispatch(providerContext.dispatch, actions),
        ...bindContext({...providerContext, ...context}, effects),
      })
    }
  </Consumer>
)

export default Container
