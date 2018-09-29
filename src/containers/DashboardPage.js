import React from 'react'
import Container from 'adapters/Container'
import Page from 'views/Page'
import {getLights} from 'state/selectors'
import Wrapper from 'views/Wrapper'
import Title from 'views/Title'

const Light = ({light}) => (
  <div>{light.name}</div>
)

const Lights = ({lights}) => (
  <Page>
    <Wrapper>
      <Title>Dashboard</Title>
    </Wrapper>
    {lights.match({
      Some: lights => lights.map(light => (
        <Light key={light.uniqueid} light={light} />
      )),
      None: () => <div>No lights Found</div>
    })}
  </Page>
)

const presenter = {
  selectors: {
    getLights
  }
}

const DashboardPage = () => (
  <Container {...presenter} >{$ => (
    <Lights lights={$.getLights()} />
  )}</Container>
)

export default DashboardPage
