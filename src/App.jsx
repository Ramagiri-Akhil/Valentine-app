import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router'
import Proposal from './components/proposal'
import MainPage from './pages/MainPage'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={ <Proposal/>} />
        <Route path='/love' element={ <MainPage/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App