import React from 'react'
import {Consumer} from './context'
import mapStateToSelectors from '../translators/mapStateToSelectors'
import mapStateToActions from '../translators/mapStateToActions'
import mapStateToEffects from '../translators/mapStateToEffects'

const Container = ({selectors = {}, actions = {}, effects = {}, children}) => (
  <Consumer>
    {({ state, setState }) =>
      children({
        state,
        setState,
        ...mapStateToSelectors(state, selectors),
        ...mapStateToActions(state, setState, actions),
        ...mapStateToEffects(state, setState, effects)
      })
    }
  </Consumer>
)

export default Container
