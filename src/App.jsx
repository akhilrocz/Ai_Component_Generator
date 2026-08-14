import React from 'react'
import {BrowserRouter,Routes,Route} from "react-router-dom"
import "./App.css"
import Home from './pages/Home'
import Preview from "./pages/Preview"

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/> }/>
        <Route path='/preview' element={<Preview/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App