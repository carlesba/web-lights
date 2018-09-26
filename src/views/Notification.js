import styled from 'styled-components'

const Notification = styled.div`
  background: linear-gradient(
    to top right,
    red, #f06d06
  );
  font-size: 15px;
  font-weight: bold;
  color: white;
  padding: 10px 20px;
  position: relative;
  display: inline-block;
  border-radius: 20px;
  border: none;
  box-shadow: 0 0 10px #333;
  cursor: pointer;
`
Notification.displayName = 'Notification'

export default Notification
