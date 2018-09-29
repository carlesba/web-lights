/**
 * Utils
 */
export const ip = '192.168.1.154'
export const responseIp = [{ id: '001788fffe6242ba', internalipaddress: ip }]
export const LOCAL_CONFIG = {
  username: 'hue.username',
  devicetype: 'hue.devicetype'
}
export const LIGHTS = [
  {id: '1', state: {}},
  {id: '2', state: {}}
]
export const LocalSuccess = () => ({ getItem: k => k })
export const LocalFail = () => ({ getItem: () => null })
export const Transport = value => () => Promise.resolve(value)
export const TransportFindIp = () => () => Promise.resolve(responseIp)
export const FailTransport = () =>
  () => Promise.resolve({}).then(response => response.json())
