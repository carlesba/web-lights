import React from 'react'
import styled from 'styled-components'
import { path, pick, pipe, prop } from 'ramda'
import { xyBriToHex } from 'Color'

const getXYBriFromLight = pipe(prop('state'), pick(['xy', 'bri']))

const getColor = light =>
  [getXYBriFromLight(light)]
    .map(({xy, bri}) => ({x: xy[0], y: xy[1], bri: bri / 255}))
    .map(xyBriToHex)
    .shift()

const getName = prop('name')
const getStatus = path(['state', 'on'])

const LightWrapper = styled.div`
  display: flex;
  align-items: center;
  border-radius: 50px;
  margin: 30px 20px;
  padding: 10px;
  border: 1px solid ${p => p.color};
  box-shadow: 0px 0px 20px 5px ${p => p.color};
  opacity: ${p => p.enabled ? 1 : 0.5};
`

const LightColor = styled.div`
  height: 50px;
  width: 50px;
  background: ${p => p.color};
  border-radius: 50%;
  margin-right: 20px;
`

const LightName = styled.div`
  white-space: nowrap;
  font-size: 20px;
  color: rgba(222,222,222, 0.85);
`

const Light = ({light, onSwitch}) => (
  <LightWrapper
    enabled={getStatus(light)}
    color={getColor(light)}
    onClick={onSwitch}
    >
    <LightColor color={getColor(light)} />
    <LightName>{getName(light)}</LightName>
  </LightWrapper>
)

export default Light
