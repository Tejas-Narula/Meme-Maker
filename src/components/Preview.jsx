import React from 'react'
import './Preview.css'
export default function Preview({setImageReady,textBoxes,memeTemplate,mousePos,setTextBoxes,inputRefs,imgRef}){

  const [selected, setSelected] = React.useState({hold: false, id: "", holdPos:{x:0,y:0}})
  const [imgSize, setImgSize] = React.useState({ w: 1, h: 1 })


  React.useEffect(() => {
  setImageReady(false)
}, [memeTemplate])


  //Mouce Up handler
  React.useEffect(() => {
  function handleMouseUp(){
    setSelected(prevSelected => ({
      ...prevSelected,
      hold: false
    }))
  }

  window.addEventListener('mouseup', handleMouseUp)
  return () => {
    window.removeEventListener('mouseup', handleMouseUp)
  }
  }, [])

  //mouse move/hold handler
  React.useEffect(() => {
    if (!selected.hold) return

    setTextBoxes(prevTextBoxes =>
      prevTextBoxes.map(textBox => 
        textBox.id === selected.id ?
        {...textBox,
        pos:{
          x: mousePos.x - selected.holdPos.x,
          y: mousePos.y - selected.holdPos.y
        },
        posP: {
  x: (mousePos.x - selected.holdPos.x) / imgSize.w,
  y: (mousePos.y - selected.holdPos.y) / imgSize.h
}

      }:textBox)
    )
  }, [mousePos,selected,setTextBoxes])

  return(
    memeTemplate !== null ?
    
    (<div className="meme" onMouseDown={()=>setSelected({hold: false, id: "", holdPos:{x:0,y:0}})}>
      {/* Meme Template */}
      <img
        ref={imgRef}
        src={memeTemplate}
        onLoad={() => {
          setImgSize({
            w: imgRef.current.clientWidth,
            h: imgRef.current.clientHeight
          })
          setImageReady(true)
        }}
      />

      {/* Text booxes on preview */}
      {textBoxes.map((textBox)=>{
        const isSelected = selected.id == textBox.id
        const isheld = isSelected && selected.hold
        // const fontSize = Number( textBox.fontSize)
        // console.log(fontSize)

         
        return(
          <span
            key={textBox.key}
            style={{
              position: "absolute",
              left: `${textBox.posP.x * imgSize.w}px`,
              top: `${textBox.posP.y * imgSize.h}px`
            }}
          >

            
          <p 
            onMouseDown={(e)=>{
              e.stopPropagation();

              
              const xPx = textBox.posP.x * imgSize.w
              const yPx = textBox.posP.y * imgSize.h

              setSelected(prev => ({
                ...prev,
                id: textBox.id,
                hold: true,
                holdPos: {
                  x: mousePos.x - xPx,
                  y: mousePos.y - yPx
                }
              }))

              // console.log(textBox, textBox.pos, mousePos)
            }}
            
            onDoubleClick={(e)=>{
              e.stopPropagation()
              inputRefs.current[textBox.id].focus();inputRefs.current[textBox.id].select()
            }}

            style={{fontFamily:textBox.font, fontSize: `${textBox.fontSizeP * imgSize.h}px`
            }}
            
            className={`${isSelected ? "selected-text" : ""} ${isheld ? "held" : ""}`}
          >
                {textBox.value}
              </p>
          </span>)
      })}

    </div>)

    : (<div className='meme' style={{display:"flex", justifyContent:"center", alignItems:"center"}}><p style={{color:"#27292b", fontStyle: "italic", fontSize:"0.8rem", userSelect:"none"}}>Select a Meme Template</p></div>)

    
  )
}