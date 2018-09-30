import React from 'react'
import Container from 'adapters/Container'
import Storage from 'adapters/Storage'
import connectHue from 'effects/connect'
import { getConnectionStatus } from 'state/selectors'
import Page from 'views/Page'
import Centerer from 'views/Centerer'
import Text from 'views/Text'
import Title from 'views/Title'
import Logo from 'views/Logo'
import Wrapper from 'views/Wrapper'
import ConnectButton from 'views/ConnectButton'

const ConnectionStatus = ({status, onConnect}) => (
  status.match({
    Connected: ({ip, username}) => (
      <Centerer>
        <Wrapper>
          <Title>Success!</Title>
        </Wrapper>
        <Text>Bridge connected</Text>
        <Text>ip: {ip}</Text>
        <Text>username: {username}</Text>
        <Wrapper size='40px'/>
      </Centerer>
    ),
    PressButton: () => (
      <Centerer>
        <Wrapper>
          <Title>Just one more thing…</Title>
        </Wrapper>
        <Wrapper>
          <Text>Push the blue button on the Hue Bridge and then try to connect again</Text>
        </Wrapper>
        <Wrapper size='40px' />
        <ConnectButton onClick={onConnect}>Bridge button pressed!</ConnectButton>
      </Centerer>
    ),
    Disconnected: () => (
      <Centerer>
        <Wrapper>
          <Title>Disconnected</Title>
        </Wrapper>
        <Wrapper>
          <Text>Make sure you are in the same network as the Hue Bridge and connect</Text>
        </Wrapper>
        <Wrapper size='40px' />
        <ConnectButton onClick={onConnect}>Connect</ConnectButton>
      </Centerer>
    )
  })
)

const presenter = {
  selectors: { getConnectionStatus },
  effects: { connect: connectHue(Storage) }
}

const ConnectPage = () => (
  <Container {...presenter} >{$ => (
    <Page>
      <Logo />
      <ConnectionStatus
        status={$.getConnectionStatus()}
        onConnect={$.connect}
      />
    </Page>
  )}</Container>
)
export default ConnectPage
