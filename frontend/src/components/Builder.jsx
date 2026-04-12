import './css/Builder.css'
import Button from './Elements/Button'
import React from 'react'
import Inputs from './Inputs'

import DarkModal from '../components/popup';
import { ShareMeme, createMemeImage } from '../functions';


export default function Builder({imageReady,imgRef,allMemes,setMemeTemplate,downloadMeme,setTextBoxes,textBoxes,GenrateRandomMemeTemplate,inputRefs,memedata}){

function addTextBox(
  value="Text Box",
  pos={x:50,y:100},
  font="Impact",
  fontSize=12
){
  if (!imgRef.current || imgRef.current.clientHeight === 0) {
    console.warn("Image not ready yet")
    return
  }

  const h = imgRef.current.clientHeight
  const w = imgRef.current.clientWidth

  const posP = { x: pos.x / w, y: pos.y / h }
  const fontSizeP = fontSize / h

  setTextBoxes(prev => {
    const id = prev.length + 1
    return [...prev, { value, id, key: id, posP, font, fontSizeP }]
  })
}

  const defaultMeme = false;
  React.useEffect(()=>{
    if (!defaultMeme) return;
    if(allMemes.length != 0){
      
      setMemeTemplate(allMemes[12].url);}
  },[allMemes])

  React.useEffect(() => {
  if (!imageReady) return

  // addTextBox("I created a MeMé maker",{x:16,y:27},"Impact",14)
  // addTextBox("you mean 'meme' right?",{x:182,y:14},"Impact",14)
  // addTextBox('MeMé',{x:60,y:180},"Impact",24)
  // addTextBox("ow",{x:284,y:300},"Impact",12)
}, [imageReady])

  const [showPopup, setShowPopup] = React.useState(false);
  const [previewUrl, setPreviewUrl] = React.useState(null);

  // Generate preview image when popup is opened
  async function handleOpenPostPopup() {
    if (memedata.memeTemplate && memedata.textBoxes) {
      try {
        const canvas = await createMemeImage(memedata.textBoxes, memedata.memeTemplate);
        setPreviewUrl(canvas.toDataURL("image/png"));
      } catch (err) {
        console.error("Failed to generate preview:", err);
        setPreviewUrl(null);
      }
    }
    setShowPopup(true);
  }


  function handleChange(event){
    const value = event.currentTarget.value
    const id = event.currentTarget.id

    setTextBoxes(prevTextBoxes=>
      prevTextBoxes.map(textBox=>
          (textBox.id != id ? textBox : {...textBox, value:value})
        )
    )
  }

  return(
    <div className='Builder'>
      <Inputs textBoxes={textBoxes} handleChange={handleChange} setTextBoxes={setTextBoxes} inputRefs={inputRefs} imgRef={imgRef}/>
      
      <div className="options">
        <Button text="Add Text" func={()=>addTextBox()}/>
        <Button text="Random Meme" func={GenrateRandomMemeTemplate}/>
        <Button text="Download" func={()=>downloadMeme(textBoxes)}/>
      </div>
      <div className="options">
        <Button func={handleOpenPostPopup} text="Post Meme" />
        {/* <Button func={() => setShowPopup(true)} text="Save Meme" /> */}

      </div>

      <DarkModal
        isOpen={showPopup}
        onClose={() => { setShowPopup(false); setPreviewUrl(null); }}
        previewImageUrl={previewUrl}
        onSubmit={(val) => {
          console.log(val)
          if (val === '') return;
          ShareMeme({...memedata, title: val})
          setShowPopup(false)
          setPreviewUrl(null)
        }}
      />
      
    </div>

  )
}