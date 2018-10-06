import React from 'react'
import {Consumer} from './context'
import { mapObjIndexed } from 'ramda'

const bindState = (state, selectors) =>
  mapObjIndexed(selector => selector.bind(selector, state), selectors)

const bindDispatch = (dispatch, actions) =>
  mapObjIndexed(action => (...args) => dispatch(action(...args)), actions)

const bindContext = (context, effects) =>
  mapObjIndexed(effect => effect.bind(effect, context), effects)

const Container = ({selectors = {}, actions = {}, effects = {}, children}) => (
  <Consumer>
    {context =>
      children({
        getState: context.getState,
        dispatch: context.dispatch,
        ...bindState(context.getState(), selectors),
        ...bindDispatch(context.dispatch, actions),
        ...bindContext(context, effects),
      })
    }
  </Consumer>
)

export default Container
