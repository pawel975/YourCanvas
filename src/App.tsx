import { useState } from 'react'
import './App.css'
import Main from './pages/Main/Main'
import NavBar from './layouts/NavBar/NavBar'

const App = () => {

  return (
    <div className="app">
      <NavBar/>
      <Main/>
    </div>
  )
}

export default App
