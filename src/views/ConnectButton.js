import styled from 'styled-components'

const ConnectButton = styled.button`
  background: linear-gradient(
    to top right,
    #0051ff, #00ffff
  );
  font-size: 20px;
  text-transform: uppercase;
  color: rgba(222,222,222);
  text-shadow: 0 0 6px #06F;
  padding: 10px 20px;
  position: relative;
  display: inline-block;
  border-radius: 20px;
  border: none;
  box-shadow: 0 0 10px #333;
  cursor: pointer;
  transition: box-shadow 100ms cubic-bezier(0.01, 1.01, 0.4, 1.54);
  box-shadow: 0 0 10px -1px #00ebff;
  &:hover {
    box-shadow: 0 0 24px -1px #00ebff;
  }
`
ConnectButton.displayName = 'ConnectButton'

export default ConnectButton
