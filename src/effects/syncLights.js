import { of, reject } from 'fluture'
import {
  getConnectionStatus
} from 'state/selectors'
import readLights from './common/readLights'

const syncLights = context => {
  const { getState } = context
  const state = getState()
  getConnectionStatus(state)
    .match({
      Connected: config => of(config),
      PressButton: () => reject('needs connection'),
      Disconnected: () => reject('needs connection')
    })
    .chain(config => readLights(context, config))
    .fork(
      err => { console.error('bad stuff', err)},
      lights => { console.log('done', lights) }
    )
}

export default syncLights
