import React from 'react'
import Container from 'adapters/Container'
import Storage from 'adapters/Storage'
import connectHue from 'effects/connect'
import { getConnectionStatus, getNotifications } from 'state/selectors'
import { clearNotification } from 'state/actions'
import Page from 'views/Page'
import ConnectButton from 'views/ConnectButton'

const ConnectionStatus = ({status, onConnect}) => (
  status.match({
    Connected: ({ip, username}) => (
      <div>
        <h1>Connected!</h1>
        <div>ip: {ip}</div>
        <div>username: {username}</div>
      </div>
    ),
    PressButton: () => (
      <div>
        <h1>need action</h1>
        <div>Press Hue Link Button and try again</div>
        <ConnectButton onClick={onConnect} />
      </div>
    ),
    Disconnected: () => (
      <div>
        <h1>need action</h1>
        <div>No Connection</div>
        <ConnectButton onClick={onConnect}>Connect</ConnectButton>
      </div>)
  })
)

const Notifications = ({message, onClear}) =>
  <React.Fragment>{message.match({
    Some: value => (
      <div>
        <span>{value}</span>
        <button onClick={onClear}>XXXXX</button>
      </div>
    ),
    None: () => <div />
  })}</React.Fragment>

const presenter = {
  selectors: { getConnectionStatus, getNotifications },
  actions: { clearNotification },
  effects: { connect: connectHue(Storage) }
}

const ConnectPage = () => (
  <Container {...presenter} >{$ => (
    <Page>
      <Notifications
        message={$.getNotifications()}
        onClear={$.clearNotifications}
      />
      <ConnectionStatus
        status={$.getConnectionStatus()}
        onConnect={$.connect}
      />
    </Page>
  )}</Container>
)
export default ConnectPage
