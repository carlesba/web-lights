import HueConnectionErrors from 'unions/HueConnectionErrors'
import { updateLights } from 'state/actions'
import { getConnectionStatus } from 'state/selectors'
import { tap } from 'ramda'
import { reject } from 'fluture'

const readLights = ({Storage, dispatch, getState}) =>
  getConnectionStatus(getState())
    .match({
      Connected: config => Storage.syncLights(config)
        .mapRej(() => HueConnectionErrors.BadRequest),
      PressButton: () => reject(HueConnectionErrors.BadRequest),
      Disconnected: () => reject(HueConnectionErrors.BadRequest)
    })
    .map(tap(lights => dispatch(updateLights(lights))))

export default readLights
