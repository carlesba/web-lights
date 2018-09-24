import { of, reject } from 'fluture'
import lights from '../../fixtures/lights.json'

export const IP = '192.168.1.100'
export const USERNAME = 'username'
export const LIGHTS = lights

export const Success = {
  getLocalConfig: () => of(USERNAME),
  saveUsername: () => of(USERNAME),
  discoverHue: () => of(IP),
  postAppInHue: () => of([{success: {username: USERNAME}}]),
  syncLights: () => of(LIGHTS)
}

const ERROR_POST_APP = [{"error":{"type":100,"address":"","description":"wrong"}}]
const ERROR_POST_APP_BUTTON = [{"error":{"type":101,"address":"","description":"link button not pressed"}}]

export const Failure = {
  getLocalConfig: () => reject('fail'),
  saveUsername: () => reject('fail'),
  discoverHue: () => reject('fail'),
  postAppInHue: () => of(ERROR_POST_APP),
  postAppInHueLink: () => of(ERROR_POST_APP_BUTTON),
  syncLights: () => reject('reason cant sync')
}
