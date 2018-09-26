import React from 'react'
import Container from 'adapters/Container'
import { getNotifications } from 'state/selectors'
import { clearNotification } from 'state/actions'
import Notification from 'views/Notification'
import styled from 'styled-components'

const Corner = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
`

const NotificationRoot = ({message, onClear}) =>
  <Corner>{message.match({
    Some: value => (
      <Notification>
        <span>{value}</span>
        <span style={{marginLeft: 10}} onClick={() => onClear()}>✕</span>
      </Notification>
    ),
    None: () => <div />
  })}</Corner>


const presenter = {
  selectors: { getNotifications },
  actions: { clearNotification }
}

const Notifications = () => (
  <Container {...presenter}>{$ =>
    <NotificationRoot
      message={$.getNotifications()}
      onClear={$.clearNotification}
    />
  }</Container>
)

export default Notifications
