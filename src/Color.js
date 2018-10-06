import {defaultTo, tap} from 'ramda'

const rgbToList = ({r, g, b}) => ([r, g, b])
const rgbToObject = ([r, g, b]) => ({r, g, b})
/*
 * Conversions for the sRGB color space.
 * See: http://en.wikipedia.org/wiki/Srgb
 */

const validateXYBri = xyb => {
  if (0 > xyb.x || xyb.x > .8)
    throw new Error('x property must be between 0 and .8, but is: ' + xyb.x)
  if (0 > xyb.y || xyb.y > 1)
    throw new Error('y property must be between 0 and 1, but is: ' + xyb.y)
  if (0 > xyb.bri || xyb.bri > 1)
    throw new Error('bri property must be between 0 and 1, but is: ' + xyb.bri)
}

const xybToXYZ = ({x, y, bri}) => ({
  X: (bri / y) * x,
  Y: bri,
  Z: (bri / y) * (1 - x - y)
})

const wideGamutD65conversion = ({X, Y, Z}) => ({
  r: X  * 1.612 - Y * 0.203 - Z * 0.302,
  g: -X * 0.509 + Y * 1.412 + Z * 0.066,
  b: X  * 0.026 - Y * 0.072 + Z * 0.962
})

const gammaCorrection = c =>
  c <= 0.0031308
    ? 12.92 * c
    : (1.0 + 0.055) * Math.pow(c, (1.0 / 2.4)) - 0.055

const applyGammaCorrection = rgb => rgb.map(gammaCorrection)

const normalize = x => Math.max(0, Math.min(1, x))

const normalizeChannels = rgb => rgb.map(normalize)

export const xyBriToRgb = xyb =>
  [xyb]
    .map(tap(validateXYBri))
    .map(xybToXYZ)
    .map(wideGamutD65conversion)
    .map(rgbToList)
    .map(applyGammaCorrection)
    .map(normalizeChannels)
    .map(rgbToObject)
    .shift()

const validateRGB = rgb =>
  [rgb]
    .map(rgbToList)
    .map(rgb => rgb.forEach(c => {
      if (0 > c || c > 1) {
        throw new Error('[Color] RGB values should be between 0 and 1')
      }
    }))

const rgbGammaCorrection = c => (c > 0.04045)
  ? Math.pow((c   + 0.055) / (1.0 + 0.055), 2.4)
  : (c / 12.92)

const rgbWideGamutConversionD65 = ({r, g, b}) => ({
  X: r * 0.649926 + g * 0.103455 + b * 0.197109,
  Y: r * 0.234327 + g * 0.743075 + b * 0.022598,
  Z: r * 0.0000000 + g * 0.053077 + b * 1.035763
})

const XYZtoxybri = (({X, Y, Z}) => ({
  x: defaultTo(0, X / (X + Y + Z)),
  y: defaultTo(0, Y / (X + Y + Z)),
  bri: Y
}))

// rgb -> xybri
export const rgbToXyBri = rgb =>
  [rgb]
    .map(tap(validateRGB))
    .map(rgbToList)
    .map(rgb => rgb.map(rgbGammaCorrection))
    .map(rgbToObject)
    .map(rgbWideGamutConversionD65)
    .map(XYZtoxybri)
    .shift()

const decToHex = n =>
  [n]
    .map(x => Math.round(x * 255))
    .map(x => ('0' + x.toString(16)))
    .map(x => x.substr(-2))

// rgb -> hex
export const rgbToHex =  rgb =>
  [rgb]
    .map(rgbToList)
    .map(rgb => rgb.map(decToHex).join(''))
    .map(hex => hex.toUpperCase())
    .map(hex => `#${hex}`)
    .shift()

// hex -> rgb
export const hexToRgb = hex => ({
  r : parseInt(hex.substring(1, 3), 16) / 255,
  g : parseInt(hex.substring(3, 5), 16) / 255,
  b : parseInt(hex.substring(5, 7), 16) / 255
})

// hex -> xybri
export const hexToXyBri = hex =>
  [hex].map(hexToRgb).map(rgbToXyBri).shift()

// xybri -> hex
export const xyBriToHex = xybri =>
  [xybri].map(xyBriToRgb).map(rgbToHex).shift()