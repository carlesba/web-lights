import { of, reject } from 'fluture'
import { getLight } from 'state/selectors'
import readLights from './common/readLights'

export default (context, lightId) => {
  const {getState, Storage} = context
  getLight(getState(), lightId)
    .match({
      Some: light => of(light),
      None: () => reject()
    })
    .chain(light => Storage
      .updateLightState(getState().config, lightId, { on: !light.state.on })
    )
    .chain(() => readLights(context))
    .fork(
      err => { console.error(err) },
      () => { console.log('complete') }
    )
}
