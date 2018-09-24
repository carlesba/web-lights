import React from 'react'
import Container from 'adapters/Container'
import Storage from 'adapters/Storage'
import connectHue from 'effects/connect'
import { getConfig, getLights, getProblems } from '../state/selectors'

const ConnectionStatus = ({config, problem, lights = []}) => (
  <div>
    <div>username: {config.username}</div>
    <div>ip: {config.ip}</div>
    <div>problem: {problem}</div>
    <div>lights: {lights.map((light, index) => <div key={index}>{light.name}</div>)}</div>
  </div>
)

const ConnectButton = ({onClick}) =>
  <button onClick={onClick}>Connect</button>

const presenter = {
  selectors: {
    problems: getProblems,
    config: getConfig,
    lights: getLights
  },
  effects: { connect: connectHue(Storage) }
}

const HueFinder = () => (
  <Container {...presenter} >{(props) => {
    return (
    <div>
      <ConnectionStatus
        config={props.config()}
        problem={props.problems()}
        lights={props.lights()}
      />
      <ConnectButton onClick={props.connect} />
    </div>
  )}}</Container>
)

export default HueFinder
