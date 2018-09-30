import React from 'react'
import {Consumer} from './context'
import mapStateToSelectors from './adapters/mapStateToSelectors'
import mapDispatchToActions from './adapters/mapDispatchToActions'
import mapStateToEffects from './adapters/mapStateToEffects'

const Container = ({selectors = {}, actions = {}, effects = {}, children}) => (
  <Consumer>
    {({ state, dispatch }) =>
      children({
        state,
        dispatch,
        ...mapStateToSelectors(state, selectors),
        ...mapDispatchToActions(dispatch, actions),
        ...mapStateToEffects(state, dispatch, effects)
      })
    }
  </Consumer>
)

export default Container
