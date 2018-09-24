import Storage, {createStorage} from './Storage'

describe('Storage', () => {
  it('has interface to handle app data remote and locally', () => {
    const StorageMethods = ['getLocalConfig', 'saveUsername', 'discoverHue', 'postAppInHue', 'syncLights']
    expect(Object.keys(Storage)).toEqual(StorageMethods)
    expect(Object.keys(createStorage({}))).toEqual(StorageMethods)
  })
  // TODO: test methods
})
