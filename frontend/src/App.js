import React from 'react'
import styled from 'styled-components'
import MiddlePanel from './components/Overview'
import RightPanel from './components/RightPanel'
import SidePanel from './components/SidePanel'

const Container = styled.div`
    display: flex;
    height: 100vh;
    background-color: rgba(0, 0, 255, .2)
`
const Left = styled.div`
    display: flex;
    flex: 1;
`
const Right = styled.div`
    display: flex;
    flex: 4;
    height: 96%;
    width: 97%;
    color: white;
    margin: 12px;
    border-radius: 20px;
    background-color: blue;
`

const App = () => {
  return (
      <Container>
          <Left>
              <SidePanel />
          </Left>
          <Right>
              <MiddlePanel />
              <RightPanel />
          </Right>
      </Container>
  )
}

export default App