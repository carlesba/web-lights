import {
  hexToRgb,
  hexToXyBri,
  rgbToHex,
  rgbToXyBri,
  xyBriToHex,
  xyBriToRgb
} from './Color'

describe('Color', () => {
  it('#xyBriToRgb', () => {
    const rgb = {r: 0, g: 1, b: 0}
    const xybri = {x: 0, y: 1, bri: 1}
    expect(xyBriToRgb(xybri))
      .toEqual(rgb)
  })
  it('#rgbToXyBri', () => {
    expect(rgbToXyBri({r: 0, g: 0, b: 0}))
      .toEqual({x: 0, y: 0, bri: 0})
  })
  it('#rgbToHex', () => {
    expect(rgbToHex({r: 1, g: 1, b: 0}))
      .toEqual('#FFFF00')
  })
  it('#hexToRgb', () => {
    expect(hexToRgb('#000000'))
      .toEqual({r: 0, g: 0, b: 0})
  })
  it('#hexToXyBri', () => {
    expect(hexToXyBri('#000000'))
      .toEqual({x: 0, y: 0, bri: 0})
  })
  it('#xyBriToHex', () => {
    expect(xyBriToHex({x: 0, y: 1, bri: 1}))
      .toEqual('#00FF00')
  })
})