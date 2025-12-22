// import { useState } from 'react'
import Antigravity from './components/bits/Antigravity';
import React from 'react' 
import './App.css'
import Builder from './components/builder'

import Header from "./components/Header"
import Preview from "./components/Preview"
import Templates from './components/templates'



function App() {
  // [{key,id,value,pos:{x,y},font,fontSize}]
  const [textBoxes, setTextBoxes] = React.useState([])

  const [allMemes, setAllMemes] = React.useState([])
  const [memeTemplate, setMemeTemplate] = React.useState(null)
  const inputRefs = React.useRef({})
  const imgRef = React.useRef(null)


  //Fetch all memes and store it
  React.useEffect(()=>{
    console.log("Fetching..")
    fetch('https://api.imgflip.com/get_memes')
      .then(res=>res.json())
      .then(data => setAllMemes(data.data.memes))
  },[])

  //Genrate random meme template
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
  

  //Download/Save completed Meme

  function downloadMeme(textBoxes,templateUrl=memeTemplate){
    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext('2d');

    const image = new Image();
    image.crossOrigin = "anonymous"


    image.onload = async () =>{
      await document.fonts.ready
      canvas.width = image.width;
      canvas.height = image.height;

      const previewImg = imgRef.current

      const scaleX = image.width / previewImg.clientWidth
      const scaleY = image.height / previewImg.clientHeight


      ctx.drawImage(image, 0, 0);

      textBoxes.forEach(textBox => {
        const fontSize = textBox.fontSize
        const fontFamily = textBox.font;
        // const fontWeight = textBox.fontSize

        ctx.textBaseline = "top"
        ctx.font = `400 ${fontSize * scaleY}px ${fontFamily}`
        ctx.fillStyle = "white"
        ctx.strokeStyle = "black"
        ctx.lineWidth = 3
        // ctx.textAlign = "center" problematic af dont do

        const x = textBox.pos.x * scaleX
        const y = textBox.pos.y * scaleY

        ctx.strokeText(textBox.value,x,y)
        ctx.fillText(textBox.value,x,y)
      });

      const link = document.createElement("a")
      link.download = "MeMé Maker - Meme.png"
      link.href = canvas.toDataURL("image/png")
      link.click()
    }

    image.src = templateUrl
  }
  


  return(
  <>
  
  <Header/>
  <div className="main">
    <Builder textBoxes={textBoxes} setTextBoxes={setTextBoxes} GenrateRandomMemeTemplate={GenrateRandomMemeTemplate} inputRefs={inputRefs} downloadMeme={downloadMeme} setMemeTemplate={setMemeTemplate} allMemes={allMemes}/>
    <Preview textBoxes={textBoxes} memeTemplate={memeTemplate} mousePos={mousePos} setTextBoxes={setTextBoxes} inputRefs={inputRefs} imgRef={imgRef}/>
  </div>

  <Templates allMemes={allMemes} setMemeTemplate={setMemeTemplate}/> 

  </>
  )
}

export default App
