import { of, reject } from 'fluture'
import LIGHTS from '../../fixtures/lights.json'

export const IP = '192.168.1.100'
export const USERNAME = 'username'

export const Success = {
  getLocalConfig: () => of(USERNAME),
  saveUsername: () => of(USERNAME),
  discoverHue: () => of(IP),
  postAppInHue: () => of(USERNAME),
  syncLights: () => of(LIGHTS)
}

export const Failure = {
  getLocalConfig: () => reject('fail'),
  saveUsername: () => reject('fail'),
  discoverHue: () => reject('fail'),
  postAppInHue: () => reject('fail'),
  syncLights: () => reject('reason cant sync')
}
