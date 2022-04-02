import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
    display: flex;
    height: 100vh;
`
const Left = styled.div`
    display: flex;
    flex: 1;
`
const Right = styled.div`
    display: flex;
    flex: 4;
    background-color: black;
    height: 96%;
    width: 97%;
    margin: 12px;
    border-radius: 20px;
`

const App = () => {
  return (
      <Container>
          <Left></Left>
          <Right></Right>
      </Container>
  )
}

export default App