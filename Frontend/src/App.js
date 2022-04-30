import React from 'react'
import { List, Book, AddBook } from './components/Books'
import {
  BrowserRouter as Router, Route, Routes
} from 'react-router-dom'

const App = () => {
  return (
    <Router>
      <Routes>
      <Route path="/" component={List}/>
      </Routes>
    </Router>
  )
}

export default App