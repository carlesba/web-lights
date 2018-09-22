import React from 'react'
import Container from 'adapters/Container'
import Storage from 'adapters/Storage'
import connectHue from 'effects/connect'

const ConnectionStatus = ({value}) => <div>{value}</div>

const ConnectButton = ({onClick}) => <button onClick={onClick}>Connect</button>

const getStatusConnection = () => (state) => state.config ? 'no-connected': 'connected'

const presenter = {
  selectors: { status: getStatusConnection },
  effects: { connect: connectHue(Storage) }
}

const HueFinder = () => {
  return (
    <Container {...presenter} >{(props) => (
      <div>
        <ConnectionStatus value={props.status()} />
        <ConnectButton onClick={props.connect} />
      </div>
    )}</Container>
  )
}

export default HueFinder
