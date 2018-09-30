import React from 'react'
import styled from 'styled-components'
import { path, prop } from 'ramda'

const getColor = () => 'red'
const getName = prop('name')
const getStatus = path(['state', 'on'])

const LightWrapper = styled.div`
  display: flex;
  align-items: center;
  border-radius: 50px;
  margin: 20px;
  padding: 10px;
  border: 1px solid ${p => p.color};
  opacity: ${p => p.on ? 1 : 0.5};
`

const LightColor = styled.div`
  height: 50px;
  width: 50px;
  background: red;
  border-radius: 50%;
  margin-right: 20px;
`

const LightName = styled.div`
  white-space: nowrap;
  font-size: 20px;
`

const Light = ({light}) => (
  <LightWrapper
    enabled={getStatus(light)}
    color={getColor(light)}
    >
    <LightColor color={getColor(light)} />
    <LightName>{getName(light)}</LightName>
  </LightWrapper>
)

export default Light
