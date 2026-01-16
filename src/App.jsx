import Antigravity from './components/bits/Antigravity';
import React, { useEffect } from 'react'
import { signInAnonymously, onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebaseConfig";

import './App.css'
import Builder from './components/builder'

import Header from "./components/Header"
import Preview from "./components/Preview"
import Templates from './components/templates'
import Posts from './components/Posts';
import ShareMeme from './components/ShareMemeButton';



function App() {
  // [{key,id,value,pos:{x,y},font,fontSize}]
  const [textBoxes, setTextBoxes] = React.useState([])

  const [allMemes, setAllMemes] = React.useState([])
  const [memeTemplate, setMemeTemplate] = React.useState(null)
  const inputRefs = React.useRef({})
  const imgRef = React.useRef(null)
  const [imageReady, setImageReady] = React.useState(false)


  //Sign In

  useEffect(()=>{
    const unsub = onAuthStateChanged(auth, async(user)=>{
      if (!user){
        await signInAnonymously(auth)
        
      }
    });

     

    return ()=>unsub(); 
  }, []);

  //Fetch all memes and store it
  React.useEffect(()=>{
    // console.log("Fetching..")
    fetch('https://api.imgflip.com/get_memes')
      .then(res=>res.json())
      .then(data => setAllMemes(data.data.memes))
  },[])

  //Genrate random meme template
  function GenrateRandomMemeTemplate(){
    if (!allMemes.length) return

    // console.log("saving meme")
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
  
//create image canvas
async function createMemeImage(textBoxes, templateUrl) {
  const canvas = document.createElement("canvas")
  const ctx = canvas.getContext("2d")

  const image = new Image()
  image.crossOrigin = "anonymous"
  image.src = templateUrl

  await new Promise(resolve => (image.onload = resolve))
  await document.fonts.ready

  canvas.width = image.width
  canvas.height = image.height

  ctx.drawImage(image, 0, 0)

  textBoxes.forEach(textBox => {
    
    // ✅ percent → absolute
    const x = textBox.posP.x * canvas.width
    const y = textBox.posP.y * canvas.height

    // ✅ font size scales with image height
    const fontSizePx = textBox.fontSizeP * canvas.height

    ctx.textBaseline = "top"
    ctx.font = `400 ${fontSizePx}px ${textBox.font}`
    ctx.fillStyle = "white"
    ctx.strokeStyle = "black"
    ctx.lineWidth = Math.max(2, fontSizePx * 0.08) // optional but recommended

    ctx.strokeText(textBox.value, x, y)
    ctx.fillText(textBox.value, x, y)

    // console.log(textBox, fontSizePx)
  }) 

  return canvas
}




function downloadMeme(textBoxes,templateUrl=memeTemplate){
    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext('2d');

    const image = new Image();
    image.crossOrigin = "anonymous"


    image.onload = async () =>{
      await document.fonts.ready
      canvas.width = image.width;
      canvas.height = image.height;

      // const previewImg = imgRef.current

      // const scaleX = image.width / previewImg.clientWidth
      // const scaleY = image.height / previewImg.clientHeight


      ctx.drawImage(image, 0, 0);

      textBoxes.forEach(textBox => {
        // const fontSize = textBox.fontSize
        // const fontFamily = textBox.font;
        // const fontWeight = textBox.fontSize

        const fontSizePx = textBox.fontSizeP * canvas.height;

        ctx.textBaseline = "top"
        ctx.font = `400 ${fontSizePx}px ${textBox.font}`;
        ctx.fillStyle = "white"
        ctx.strokeStyle = "black"
        ctx.lineWidth = 3
        // ctx.textAlign = "center" problematic af dont do

        const x = textBox.posP.x * canvas.width;
        const y = textBox.posP.y * canvas.height;

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
    <Builder textBoxes={textBoxes} setTextBoxes={setTextBoxes} GenrateRandomMemeTemplate={GenrateRandomMemeTemplate} inputRefs={inputRefs} downloadMeme={downloadMeme} setMemeTemplate={setMemeTemplate} allMemes={allMemes} imgRef={imgRef} imageReady={imageReady}/>
    <Preview textBoxes={textBoxes} memeTemplate={memeTemplate} mousePos={mousePos} setTextBoxes={setTextBoxes} inputRefs={inputRefs} imgRef={imgRef} imageReady={imageReady} setImageReady={setImageReady}/>
  </div>

  <Templates allMemes={allMemes} setMemeTemplate={setMemeTemplate}/> 

  <ShareMeme memedata={ { memeTemplate,textBoxes} }/>
  
  <Posts createMemeImage={createMemeImage}/>
  </>
  )
}

export default App
