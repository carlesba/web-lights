import styled from 'styled-components'

const ConnectButton = styled.button`
  background: linear-gradient(
    to top right,
    #0051ff, #00ffff
  );
  font-size: 20px;
  text-transform: uppercase;
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
ConnectButton.displayName = 'ConnectButton'

export default ConnectButton