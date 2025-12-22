import React from 'react'
import './Preview.css'
export default function Preview({textBoxes,memeTemplate,mousePos,setTextBoxes,inputRefs,imgRef}){

  const [selected, setSelected] = React.useState({hold: false, id: "", holdPos:{x:0,y:0}})

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
        }
      }:textBox)
    )
  }, [mousePos,selected,setTextBoxes])

  return(
    
    <div className="meme" onMouseDown={()=>setSelected({hold: false, id: "", holdPos:{x:0,y:0}})}>
      <img src={memeTemplate} alt="" ref={imgRef}/>
      
      {/* Text booxes on preview */}
      {textBoxes.map((textBox)=>{
        const isSelected = selected.id == textBox.id
        const isheld = isSelected && selected.hold
        const fontSize = Number( textBox.fontSize)
        console.log(fontSize)
        return(
          <span 
            key={textBox.key} 
            style={{top:`${textBox.pos.y}px`, left:`${textBox.pos.x}px`}} >
            
              <p 
              onMouseDown={(e)=>{
                e.stopPropagation()
                setSelected(prevSelected=> {return( {...prevSelected,id:textBox.id, hold:true, holdPos:{x:mousePos.x-textBox.pos.x,y:mousePos.y-textBox.pos.y}})})
                // console.log(textBox, textBox.pos, mousePos)
                }}
              
              onDoubleClick={(e)=>{
                e.stopPropagation()
                inputRefs.current[textBox.id].focus();inputRefs.current[textBox.id].select()}}

              style={{fontFamily:textBox.font, fontSize:`${fontSize}px`}}
              
              className={`${isSelected ? "selected-text" : ""} ${isheld ? "held" : ""}`}
              >
                {textBox.value}
              </p>
          </span>)
      })}
    </div>
    
  )
}