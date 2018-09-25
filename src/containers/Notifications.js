import React from 'react'
import Container from 'adapters/Container'
import { getNotifications } from 'state/selectors'
import { clearNotification } from 'state/actions'

const Notification = ({message, onClear}) =>
  <div>{message.match({
    Some: value => (
      <div>
        <span>{value}</span>
        <button onClick={onClear}>XXXXX</button>
      </div>
    ),
    None: () => <div />
  })}</div>


const presenter = {
  selectors: { getNotifications },
  actions: { clearNotification }
}

const Notifications = () => (
  <Container {...presenter}>{$ =>
    <Notification
      message={$.getNotifications()}
      onClear={$.clearNotifications}
    />
  }</Container>
)

export default Notifications
