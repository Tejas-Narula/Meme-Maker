// import { useState } from 'react'
import React from 'react' 
import './App.css'
import Builder from './components/builder'

import Header from "./components/Header"
import Preview from "./components/Preview"
import Templates from './components/templates'



function App() {
  const [textBoxes, setTextBoxes] = React.useState([{key: 1, id: 1, value: "I am here", pos: {x:120,y:50}},{key: 2, id: 2, value: "Yo", pos: {x:120,y:120}}])
  const [allMemes, setAllMemes] = React.useState([])
  const [memeTemplate, setMemeTemplate] = React.useState("./meme-templates/image1.png")


  

  //Fetch all memes and store it
  React.useEffect(()=>{
    console.log("Fetching..")
    fetch('https://api.imgflip.com/get_memes')
      .then(res=>res.json())
      .then(data => setAllMemes(data.data.memes))
  },[])

  function GenrateRandomMemeTemplate(){
    if (!allMemes.length) return

    console.log("saving meme")
    setMemeTemplate(allMemes[Math.round(Math.random()*allMemes.length )].url)
  }


  //get mouse pos

  const [mousePos, setMousePos] = React.useState({x:0,y:0})

  React.useEffect(() => {
    function updateMousePosition(event){
      setMousePos({x: event.clientX, y:event.clientY})
    };

    window.addEventListener('mousemove', updateMousePosition);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
    };
  }, [])
  

  
  


  return(
  <>
  
  <Header/>
  <div className="main">
    <Builder textBoxes={textBoxes} setTextBoxes={setTextBoxes} GenrateRandomMemeTemplate={GenrateRandomMemeTemplate}/>
    <Preview textBoxes={textBoxes} memeTemplate={memeTemplate} mousePos={mousePos} setTextBoxes={setTextBoxes}/>
  </div>

  <Templates allMemes={allMemes} setMemeTemplate={setMemeTemplate}/> 

  

  </>
  )
}

export default App
