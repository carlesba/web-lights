import React from 'react'
import { keys } from 'ramda'
import Container from 'connectors/Container'
import Page from 'views/Page'
import {getLights} from 'state/selectors'
import Wrapper from 'views/Wrapper'
import Title from 'views/Title'
import Light from 'views/Light'
import syncLights from 'effects/syncLights'
import switchLight from 'effects/switchLight'

const Lights = ({lights, onSync, onSwitch}) => (
  <Page>
    <Wrapper>
      <Title>Dashboard</Title>
    </Wrapper>
    <button onClick={onSync}>Sync</button>
    {lights.match({
      Some: lights => keys(lights).map(lightId => (
        <Light
          key={lightId}
          light={lights[lightId]}
          onSwitch={() => onSwitch(lightId)}
        />
      )),
      None: () => <div>No lights Found</div>
    })}
  </Page>
)

const presenter = {
  selectors: { getLights },
  effects: { onSync: syncLights, onSwitch: switchLight }
}

const DashboardPage = () => (
  <Container {...presenter} >{$ => (
    <Lights
      lights={$.getLights()}
      onSync={$.onSync}
      onSwitch={$.onSwitch}
      />
  )}</Container>
)

export default DashboardPage
