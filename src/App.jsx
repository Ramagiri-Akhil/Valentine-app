import React from 'react'
import { Analytics } from "@vercel/analytics/next";
import { BrowserRouter, Route, Routes } from 'react-router'
import Proposal from './components/Proposal'
import MainPage from './pages/MainPage'
import NotFound from './components/NotFound'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={ <Proposal/>} />
        <Route path='/love' element={<MainPage />} />
        <Route path='*' element={<NotFound />} /> 
      </Routes>
    </BrowserRouter>
  )
}

export default App