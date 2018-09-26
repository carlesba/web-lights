import styled from 'styled-components'

const Wrapper = styled.div`
  padding: ${p => p.size || '20px'};
`

Wrapper.displayName = 'Wrapper'

export default Wrapper