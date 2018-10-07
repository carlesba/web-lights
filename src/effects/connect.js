import {
  checkHueBridge,
  sendNotification,
  showDashboard
} from 'state/actions'

import setupHue from './common/setupHue'
import readLights from './common/readLights'

const BAD_REQUEST = sendNotification('BadRequest')

const connect = context => {
  const { dispatch } = context
  setupHue(context)
    .chain(() => readLights(context))
    .fork(
      problem => problem.match({
        PressButton: () => dispatch(checkHueBridge()),
        BadRequest: () => dispatch(BAD_REQUEST),
        NoInternet: () => dispatch(BAD_REQUEST)
      }),
      () => dispatch(showDashboard())
    )
}

export default connect
