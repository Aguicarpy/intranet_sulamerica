import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import {Routes , Route} from 'react-router-dom'
import Login from './Views/Login/Login'
import Home from './Views/Home/Home'

//RENDERIZAR LAS VIEWS
function App() {

  return (
    <>
      <div>
        <>
          <Routes>
              <Route path='/' element={<Login />} />
              <Route path='/inicio' element={<Home />}></Route>
          </Routes>
        </>
      </div>
    </>
  )
}

export default App
