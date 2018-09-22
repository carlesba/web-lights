import connect from './connect'
import * as mockStorage from '../adapters/Storage.mocks'
import * as Failure from 'types/Failure'
import * as actions from '../actions'

describe('effect.connect', () => {
  const testConnect = (Storage) => {
    const spy = jest.fn()
    const setState = updater => spy(updater({}))
    connect(Storage)()(setState)
    return spy
  }
  const config = {
    ip: mockStorage.IP,
    username: mockStorage.USERNAME
  }
  describe('happyPath', () => {
    it('gets username from localStorage, syncs lights and updates state config and lights', () => {

      const Storage = { ...mockStorage.Success }

      const spy = testConnect(Storage)
      expect(spy).toHaveBeenCalledWith(actions.setConfig(config)({}))
      expect(spy).toHaveBeenCalledWith(actions.updateLights(mockStorage.LIGHTS)({config}))
    })
  })
  describe('problems', () => {
    it('creates app in hue when cant find local config then happy path', () => {
      const Storage = {
        ...mockStorage.Success,
        postAppInHue: jest.fn(mockStorage.Success.postAppInHue),
        getLocalConfig: mockStorage.Failure.getLocalConfig
      }

      const spy = testConnect(Storage)

      expect(Storage.postAppInHue).toHaveBeenCalled()
      expect(spy).toHaveBeenCalledWith(actions.setConfig(config)({}))
      expect(spy).toHaveBeenCalledWith(actions.updateLights(mockStorage.LIGHTS)({config}))
    })
    it('shows NoInternet Error when cant find Hue', () => {
      const Storage = {
        ...mockStorage.Success,
        discoverHue: mockStorage.Failure.discoverHue
      }

      const spy = testConnect(Storage)

      expect(spy).toHaveBeenCalledWith(actions.showError(Failure.NoInternet)({}))
    })
    it('shows CannotCreateApp Error and wont sync lights when cant create app in Hue', () => {
      const Storage = {
        ...mockStorage.Success,
        getLocalConfig: mockStorage.Failure.getLocalConfig,
        syncLights: jest.fn(mockStorage.Success.syncLights),
        postAppInHue: mockStorage.Failure.postAppInHue
      }

      const spy = testConnect(Storage)

      expect(Storage.syncLights).not.toHaveBeenCalled()
      expect(spy).toHaveBeenCalledWith(actions.showError(Failure.CannotCreateApp)({}))
    })
    it('shows CantSync Error when cant sync with hue', () => {
      const Storage = {
        ...mockStorage.Success,
        syncLights: mockStorage.Failure.syncLights,
      }

      const spy = testConnect(Storage)

      expect(spy).toHaveBeenCalledWith(actions.setConfig(config)({}))
      expect(spy).toHaveBeenCalledWith(actions.showError(Failure.CannotSyncHue)({}))
    })
  })
})
