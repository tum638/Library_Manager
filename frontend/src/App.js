import React from 'react'
import styled from 'styled-components'
import Appbar from './components/Appbar'

const Container = styled.div`
    width: 100%;
    height: 100%
`

const App = () => {
  return (
    <Container><Appbar /></Container>
  )
}

export default App