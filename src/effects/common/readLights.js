import HueConnectionErrors from 'unions/HueConnectionErrors'
import { updateLights } from 'state/actions'
import { tap } from 'ramda'

const readLights = ({Storage, dispatch}, config) =>
  Storage.syncLights(config)
    .mapRej(() => HueConnectionErrors.BadRequest)
    .map(tap(lights => dispatch(updateLights(lights))))

export default readLights
