import React from 'react'
import {Consumer} from './context'
import mapStateToSelectors from '../translators/mapStateToSelectors'
import mapDispatchToActions from '../translators/mapDispatchToActions'
import mapStateToEffects from '../translators/mapStateToEffects'

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
