// import { useState } from 'react'
import React from 'react'
import './App.css'
import Builder from './components/builder'

import Header from "./components/Header"
import Preview from "./components/Preview"



function App() {

  const [textBoxes, setTextBoxes] = React.useState([{key: 1, id: 1, value: "I am here", pos: [420,150]},{key: 2, id: 2, value: "Yo", pos: [420,250]}])


  return(
  <>
  
  <Header/>
  <div className="main">
    <Builder textBoxes={textBoxes} setTextBoxes={setTextBoxes}/>
    <Preview textBoxes={textBoxes}/>
  </div>
  
  
  
  </>
  )
}

export default App
